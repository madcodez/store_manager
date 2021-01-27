const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

const authController = function () {
  return {
    login(req, res) {
      //console.log(req.body);
      if (!req.body.email) {
        res.json({ success: false, message: "Username was not given" });
      } else {
        if (!req.body.password) {
          res.json({ success: false, message: "Password was not given" });
        } else {
          passport.authenticate("local", function (err, user, info) {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!user) {
                res.json({
                  success: false,
                  message: "username or password incorrect",
                });
              } else {
                req.login(user, function (err) {
                  if (err) {
                    res.json({ success: false, message: err });
                  } else {
                    res.json({
                      success: true,
                      message: "Logged in successfully",
                    });
                  }
                });
              }
            }
          })(req, res);
        }
      }
    },
    async register(req, res) {
      const { name, email, password } = req.body;

      if (!name || !password || !email) {
        req.flash("error", "All fields required");
        req.flash("name", name);
        req.flash("email", email);
        return res.json({ message: "Fill feilds" });
      }
      await User.exists({ email: email }, (err, result) => {
        if (result) {
          return res.json({ message: "Email already taken" });
        }
      });
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      user
        .save()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send("Cannot save the user");
        });
    },
    logout(req, res) {
      req.logout();
      return res.json(res.locals.user);
    },
  };
};

module.exports = authController;
