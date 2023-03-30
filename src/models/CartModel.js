const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },quantity: {
    type: Number,
},
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      },
      
  ],
});

cartSchema.methods.calculateTotalPrice = function () {
  let total = 0;
  for (let i = 0; i < this.products.length; i++) {
    total += this.products[i].price;
  }
  return total;
};

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
