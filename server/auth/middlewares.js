const jwt = require("jsonwebtoken");

const checkTokenSetUser = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log(err);
        }

        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error("Unauthorized");
    res.status(401);
    next(error);
  }
};

module.exports = { checkTokenSetUser, isLoggedIn };
