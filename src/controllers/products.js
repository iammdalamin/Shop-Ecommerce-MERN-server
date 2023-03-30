const Product = require("../models/ProductModel.js");

const fs = require("fs");
const slugify = require("slugify");
const ProductModel = require("../models/ProductModel.js");

const formidable = require("formidable");
const cloudinary = require("../utils/cloudinary.js");

exports.create = async (req, res) => {
  try {
    console.log(req.body);

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //Validation
    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({
          error: "Image should be less than 1mb in size",
        });
    }

    //create product

    const product = new Product({ ...req.fields, slug: slugify(name) });
    console.log(product);
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      message: "Product Add Success",
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
exports.adminProductList = async (req, res) => {
  try {
    const { email } = req.headers;

    const products = await ProductModel.find({email})
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const product = await ProductModel.find({ slug: req.params.slug });

    if (product) {
      return res.status(200).json({
        message: "Success",
        data: product,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.productAdd = async (req, res) => {
  try {
    const { email } = req.headers;
    const { name, description, photo, category, price, quantity, shipping } =
      req.body;
    //Validation
    switch (true) {
      case !name?.trim():
        return res.status(400).json({ message: "Name is required" });
      case !description.trim():
        return res.status(400).json({ message: "Description is required" });
      case !price?.trim():
        return res.status(400).json({ message: "Price is required" });
      case !category?.trim():
        return res.status(400).json({ message: "Category is required" });
      case !quantity?.trim():
        return res.status(400).json({ message: "Quantity is required" });
      // case !shipping?.trim():
      //   return res.status(400).json({ message: "Shipping is required" });
      
    }

    if (photo) {
      const result = await cloudinary.uploader.upload(photo, {
        upload_preset: "shop",
      });


      if (result) {
       const product = await ProductModel.create({
          email,
          name,
          price,
          quantity,
          category,
          shipping,
          description,
          photo: result.url,
          slug: slugify(name),
        });
        res.status(201).json({
          message: "Product Add Success",
          data: product,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong!",
      data: err,
    });
  }
};

exports.productDelete = async (req, res) => {
  // console.log(req.body);
  try {
    const { id } = req.params;
    console.log(id);
    const data = await ProductModel.findById({ _id:id })
    if (data) {
      const result = await ProductModel.deleteOne({ _id:id })
      res.status(201).json({
        message: "Product Delete Successfully!!",
        data:result
        });
    }
      
      
    
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong!",
      data: err,
    });
  }
};
