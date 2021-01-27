const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

function init(passport) {
  // console.log(passport);
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "No user with this email." });
          }
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result)
                return done(null, user, { message: "Log in Successfully" });

              return done(null, false, {
                message: "Wrong username or password",
              });
            })
            .catch((err) => {
              done(null, false, { message: "Something went wrong" });
            });
        });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    await User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = init;
