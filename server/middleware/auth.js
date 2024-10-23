const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // checks whether user is authenticated by verifying users token
  verifyUserToken: (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).send("Access Denied / Unauthorized request");
    }

    token = token.split(" ")[1];

    try {
      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

      if (!verifiedUser) {
        return res.status(401).send("Unauthorized request");
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send("Invalid Token");
    }
  },
};
