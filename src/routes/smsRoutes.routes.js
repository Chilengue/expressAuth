import express from "express";
import { sendSms } from "../services/smsService.js";

const router = express.Router();

router.post("/send-sms", async (req, res) => {
    const { userId, message } = req.body;

    try {
        const response = await sendSms(userId, message);
        res.json({ success: true, sid: response.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
