const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

// Function to get all products

const get_all_products = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "all products",
        product: products,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Function to get the details of a product by id

const get_product_details_by_id = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      res.status(201).json({
        message: "Product details",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err,
      });
    });
};

// Function to post the product

const create_product = (req, res, next) => {
  const productName = req.body.productName;
  const productImageUrl = req.body.productImageUrl;
  const productPrice = req.body.productPrice;
  const productRating = req.body.productRating;
  const productDescription = req.body.productRating;

  const product = new Product({
    _id: mongoose.Types.ObjectId,
    name: productName,
    image: productImageUrl,
    price: productPrice,
    rating: productRating,
    description: productDescription,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product created",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Function to update a product

const update_product_by_id = (req, res, next) => {
  const productId = req.params.productId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne(
    { _id: productId },
    {
      $set: {
        updateOps,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Updated results",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Function to delete the product by Id

const delete_product_by_id = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByIdAndDelete(productId)
    .then((result) => {
      res.status(201).json({
        message: "Deleted product",
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
  get_all_products,
  get_product_details_by_id,
  create_product,
  update_product_by_id,
  delete_product_by_id,
};
