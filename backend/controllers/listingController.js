const router = require("express").Router();
const productModel = require("../Model/productModel");
const auth = require("../authentication/auth");

router.post("/", auth.verifyToken, productModel.createNewProduct);
router.get("/", productModel.getAllProduct);

router.get("/:id", productModel.getProductById);

router.put("/:id", auth.verifyToken, productModel.updateProduct);
router.delete("/:id", auth.verifyToken, productModel.deleteProduct);

module.exports = router;
