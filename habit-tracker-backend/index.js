import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users-routes.js"
import userCategoryRoutes from "./routes/user-category-routes.js"
import categoryRoutes from "./routes/category-routes.js";
import plantRoutes from "./routes/plant-routes.js";


const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);
app.use("/user-category", userCategoryRoutes);
app.use("/categories", categoryRoutes);
app.use("/plant", plantRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});