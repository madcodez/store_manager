const homeController = require("../controller/homeController");
const cartController = require("../controller/cartController");
const authController = require("../controller/authController");
const guest = require("../config/guest");

const initRoutes = (app, passport) => {
  app.get("/", homeController().index);

  app.post("/update-cart", cartController().updateCart);

  app.post("/auth/login", authController().login);
  app.post("/auth/register", authController().register);
  app.post("/auth/logout", authController().logout);

  app.get("/testApi", (req, res) => {
    //  console.log(req.user);
    res.json({
      helpText: "This is some helpful text.",
    });
  });
};

module.exports = initRoutes;
