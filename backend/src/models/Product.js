import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String },
    description: { type: String },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    currentStock: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 5 }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
