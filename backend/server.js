import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => res.send("Server is runing"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on post ${port}`));
