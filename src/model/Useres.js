import { Sequelize, Model } from "sequelize";
import sequelize from "../database/database.js";

class Users extends Model {}

User.init(
    {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING, // Adicionando número de telefone
        otp: Sequelize.STRING, // Para armazenar OTP
    },
    {
        sequelize,
        modelName: "usersss",
    }
);

export default Users;
