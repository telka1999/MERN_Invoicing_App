import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import invoicesRouters from "./routes/invoicesRouters.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/invoices", invoicesRouters);

app.get("/", (req, res) => res.send("Server is runing"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on post ${port}`));
