import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users-routes.js"

const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);
app.use("/category", userRoutes);
// app.use("/habit", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});