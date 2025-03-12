import User from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTP } from "../config/emailService.js";
import dotenv from "dotenv";

dotenv.config();

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
// Registrar novo usuário
export async function register(req, res) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Email já cadastrado!" });

    const password_hash = bcrypt.hashSync(password, 8);

    const user = await User.create({ name, email, password_hash });
    return res.status(201).json({ message: "Usuário criado!", user });
}

export async function sendOtp(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otp_expires = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save();

    await sendOTP(email, otp);
    res.json({ message: "OTP enviado para seu email!" });
}

export async function verifyOtp(req, res) {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email, otp } });

    if (!user || new Date() > new Date(user.otp_expires)) {
        return res.status(400).json({ message: "OTP inválido ou expirado!" });
    }

    user.otp = null;
    user.otp_expires = null;
    await user.save();

    const token = generateToken(user.id);
    res.json({ message: "OTP verificado!", token });
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
        return res.status(400).json({ message: "Credenciais inválidas!" });
    }

    const token = generateToken(user.id);
    res.json({ message: "Login realizado!", token });
}
