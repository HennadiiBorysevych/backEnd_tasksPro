const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User, Session } = require("../models/user");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  if (!token) {
    next(HttpError(401, "No token"));
  }

  try {
    const { id, sid } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    const currentSession = await Session.findById(sid);
    if (!user || !user.token || !currentSession || token !== user.token) {
    throw next(HttpError(401));
    }
    req.user = user;
    req.session._id = currentSession._id;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = auth;
