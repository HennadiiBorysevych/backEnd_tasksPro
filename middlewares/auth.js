const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User, Session } = require("../models/user");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
try {
  if (bearer !== "Bearer") {
   return next(HttpError(401, "Not authorized"));
  }
  if (!token) {
  return next(HttpError(401, "No token"));
  }
    const { id, sid } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    const currentSession = await Session.findById(sid);
    if (!user || !user.token || token !== user.token) {
    return next(HttpError(401, "Token invalid or expired"));
    }
    if (!currentSession) {
    return next(HttpError(401, "Session is expired"));
    }

    req.user = user;
    req.session._id = currentSession._id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
