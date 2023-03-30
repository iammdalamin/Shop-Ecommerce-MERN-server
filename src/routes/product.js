const express = require("express");
const formidable = require("express-formidable");

const router = express.Router()

//middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");

const { create,productAdd, list, photo, singleProduct, adminProductList, productDelete } = require("../controllers/products");


router.post("/product", requireSignIn, formidable(), create)
router.post("/productAdd",requireSignIn,isAdmin,productAdd)

router.get("/list", list)
router.get("/adminProductList",requireSignIn, isAdmin,adminProductList)
router.delete("/adminProductDelete/:id",requireSignIn, isAdmin,productDelete)
router.get("/product/:slug", singleProduct);


module.exports = router ;
