const slugify = require("slugify");
const CategoryModel = require("../models/CategoryModel.js");

exports.create = async (req, res) => {
    
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({
                error:"Name is required",
            })
         
        }
        const existingCategory = await CategoryModel.findOne({ name });

        if (existingCategory) {
            res.json({
                error:"Already exists"
            })
        }

        const category = await new CategoryModel({ name, slug: slugify(name) }).save()
        res.json(category)
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);

    }
}

exports.allCategories = async (req, res) => {
    
    try {
        const categories = await CategoryModel.find({ });
        res.json(categories)
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);

    }
}