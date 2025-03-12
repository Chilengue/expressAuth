import client from "../config/twilioConfig.js";
import User from "../model/User.js";

export const sendSms = async (userId, message) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone,
        });

        console.log("Mensagem enviada:", response.sid);
        return response;
    } catch (error) {
        console.error("Erro ao enviar SMS:", error.message);
        throw error;
    }
};
