const cartController = () => {
  return {
    async index(req, res) {},

    async updateCart(req, res) {
      // let cart ={
      //     items : {
      //         pizza : { item : {} , qty : 0}
      //     },
      //     totalQnty : 0,
      //     totalPrice : 0
      // }
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQnty: 0,
          totalPrice: 0,
        };
      }
      const cart = req.session.cart;

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQnty = cart.totalQnty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty += 1;
        cart.totalQnty = cart.totalQnty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      res.json({ data: cart, message: "All ok" });
    },
  };
};

module.exports = cartController;
