const Order = require("../models/Order");

// Function to create orders on users document

const create_orders = (req, res, next) => {
  const addressId = req.params.addressId;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;
  const products = [];

  for (const product of req.body) {
    products.push(product._id);
  }
  const order = new Order({
    _id: mongoose.Types.ObjectId,
    address: addressId,
    quantity: quantity,
    totalPrice: totalPrice,
    products: products,
  });

  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Order saved successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  create_orders,
};
