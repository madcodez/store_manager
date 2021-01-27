const Menu = require("../models/menu.js");

const homeController = () => {
  return {
    async index(req, res) {
      const pizzas = await Menu.find();

      res.json(pizzas);
    },
  };
};

module.exports = homeController;
