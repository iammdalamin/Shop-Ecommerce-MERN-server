

const express = require("express") ;
const { create, allCategories } = require("../controllers/category") ;

const router = express.Router();

// middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");



router.post("/category-create", requireSignIn, isAdmin, create);
router.get("/categories", requireSignIn, isAdmin, allCategories);

module.exports = router ;
