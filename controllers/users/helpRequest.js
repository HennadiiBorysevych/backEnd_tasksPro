const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../services/email");

const helpRequest = async (req, res) => {
  const { comment, email } = req.body;
  if (!email) {
    throw HttpError(400, "Error. Email required ");
  }
  if (!comment) {
    throw HttpError(400, "Error. Comment required ");
  }

  const verifyEmail = {
    subject: "Need help with the TaskPro application",
    html: `<p><strong>Сomment</strong>: ${comment}</p>
    <p>Use this email for feedback: <a target="_blank" href="mailto:${email}">${email}</a></p>
    `,
  };

  await sendEmail(verifyEmail);

  res.status(200);
  res.json({
    code: 200,
    message: "Send email",
  });
};

module.exports = helpRequest;
