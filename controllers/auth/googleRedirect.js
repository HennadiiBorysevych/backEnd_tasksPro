const queryString = require("querystring");
const axios = require("axios");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search.substring(1));
  const code = urlParams.code;
  try {
    const tokenData = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });
    const userData = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`,
      },
    });

    console.log("userData", userData);
    return res.redirect(`http://localhost:3000/order/?token=123`);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = googleRedirect;
