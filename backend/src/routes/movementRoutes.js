import express from "express";
import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/movements - list all movements (latest first)
router.get("/", protect, async (req, res) => {
  try {
    const movements = await StockMovement.find()
      .populate("product", "name sku")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/movements - create IN/OUT movement and update product stock
router.post("/", protect, async (req, res) => {
  try {
    const { productId, type, quantity, note } = req.body;

    if (!productId || !type || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let newStock = product.currentStock;

    if (type === "IN") {
      newStock += quantity;
    } else if (type === "OUT") {
      if (quantity > product.currentStock) {
        return res.status(400).json({ message: "Not enough stock" });
      }
      newStock -= quantity;
    } else {
      return res.status(400).json({ message: "Invalid movement type" });
    }

    product.currentStock = newStock;
    await product.save();

    const movement = await StockMovement.create({
      product: productId,
      type,
      quantity,
      note,
      createdBy: req.user._id
    });

    res.status(201).json(movement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
