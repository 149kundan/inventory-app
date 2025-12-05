import movementRoutes from "./routes/movementRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // to read JSON body

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/movements", movementRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
