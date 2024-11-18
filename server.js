// Import the Express module
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import wishlistRoutes from"./routes/wishlistRoute.js"
import orderRoutes from "./routes/orderRoute.js";
import artisanRoutes from "./routes/artisanRoute.js";

// Create an Express application
const app = express();

//datavbase
connectDB();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/cart",cartRoutes);
app.use("/api/v1/wishlist",wishlistRoutes);
app.use("/api/v1/orders",orderRoutes);
app.use("/api/v1/artisan",artisanRoutes);
// Define a simple route for the root path
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Make the app listen on port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
