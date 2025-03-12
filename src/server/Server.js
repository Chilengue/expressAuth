import express from "express";
import dotenv from "dotenv";
import sequelize from "../database/database.js";
import authRoutes from "../routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
});
