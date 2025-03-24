import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/user-routes.js";
import userCategoryRoutes from "./routes/user-category-routes.js";
import categoryRoutes from "./routes/category-routes.js";
import plantRoutes from "./routes/plant-routes.js";
import habitRoutes from "./routes/habit-routes.js";
import habitLogRoutes from "./routes/habit-log-routes.js";
import wateringRoutes from "./routes/watering-log-routes.js";
import chatbotRoutes from "./routes/chat-log-routes.js";
import timeCapsuleRoutes from "./routes/time-capsule-routes.js";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/user-category", userCategoryRoutes);
app.use("/categories", categoryRoutes);
app.use("/plant", plantRoutes);
app.use("/habit", habitRoutes);
app.use("/habit-log", habitLogRoutes);
app.use("/watering", wateringRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/time-capsule", timeCapsuleRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
