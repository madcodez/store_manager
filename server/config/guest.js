const guest = (req, res, next) => {
  !req.isAuthenticated()
    ? next()
    : res.json({ success: false, message: "Please Login" });
};

module.exports = guest;
