const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 30,
        unique:true, 
    },
    slug: {
        type: String,
        unique: true,
        lowercase:true,
    },
})


const CategoryModel = mongoose.model("Category", categorySchema)

module.exports = CategoryModel;