const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { sendEmail } = require("../../services/email");

const jwt = require("jsonwebtoken");

const { BASE_URL_FRONTEND, BASE_URL, SECRET_KEY } = process.env;

const forgotPasswordSend = async (req, res) => {
  const { name, email } = req.body;

  if (!name) {
    throw HttpError(400, "Error. Comment required ");
  }
  if (!email) {
    throw HttpError(400, "Error. Email required ");
  }

  const user = await User.findOne({ email, name });

  if (!user) {
    throw HttpError(404, "Not found ");
  }
  const payload = {
    id: user._id,
    name,
    email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5m" });
  const verifyEmail = {
    subject: "Need help with the TaskPro application",
    html: `<h2>Changing the password for the TaskPro application!</h2>
          <p>If it is you who is changing the password registered to my name "${name}" and e-mail "${email}",
          then click <a target="_blank" href="${BASE_URL_FRONTEND}/fotgotpassword?token=${token}">"Yes"</a>, but if it is not you who is trying to change the password,
          then click "<a target="_blank" href="${BASE_URL}/notfotgotpassword">"No, it is not me who is changing the password"</a></p>
          `,
  };

  await sendEmail(verifyEmail);

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    user: `token=${token}`,
  });
};

module.exports = forgotPasswordSend;
