import express from "express";
import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/dashboard/summary
router.get("/summary", protect, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const lowStockProducts = await Product.find({
      $expr: { $lt: ["$currentStock", "$reorderLevel"] }
    }).select("name sku currentStock reorderLevel");

    const allProducts = await Product.find();
    const totalStockValue = allProducts.reduce(
      (sum, p) => sum + p.currentStock * p.buyingPrice,
      0
    );

    const recentMovements = await StockMovement.find()
      .populate("product", "name sku")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      lowStockProducts,
      totalStockValue,
      recentMovements
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
