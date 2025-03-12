import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../database/database";

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password_hash);
    }
}

User.init(
    {
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        otp: DataTypes.STRING,
        otp_expires: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "user",
    }
);

export default User;
