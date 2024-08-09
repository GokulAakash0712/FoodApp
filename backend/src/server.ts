import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRoute from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import orderRouter from "./routers/order.router";

dbConnect();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
