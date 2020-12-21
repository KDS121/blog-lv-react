const jwt = require("jsonwebtoken");

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      if (req.query.key === "surya") {
        const { email, password } = req.body;
        if (
          email.toString() === "admin@thelittlevoice.com" &&
          password.toString() === "th3littl3v0ic3"
        ) {
          // User matched
          // Create JWT Payload
          const payload = {
            email,
          };
          // Sign token
          jwt.sign(
            payload,
            "132416521dawdwcawac21ceca516dwq321dq653",
            {
              expiresIn: 86400,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          res.json({ success: false });
        }
      } else {
        res.json({ message: null });
      }
      break;
    }
    default:
      break;
  }
};
