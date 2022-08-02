const express = require("express");
const ProductControllers = require("../controllers/ProductControllers");
const router = express.Router();

router.get("/products", ProductControllers.get_all_products);
router.get(
  "/products/:productId",
  ProductControllers.get_product_details_by_id
);
router.post("/products/post", ProductControllers.create_product);
router.patch(
  "/products/update/:productId",
  ProductControllers.update_product_by_id
);
router.delete(
  "/products/delete/:productId",
  ProductControllers.delete_product_by_id
);

module.exports = router;
