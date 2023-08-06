const currentUser = async (req, res) => {
  const { name, email, theme, avatarURL } = req.user;

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    user: {
      name,
      email,
      theme,
      avatarURL,
    },
  });
};

module.exports = currentUser;
