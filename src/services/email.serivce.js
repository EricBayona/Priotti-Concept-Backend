import nodemailer from "nodemailer";
import { envsConfig } from "../config/envs.config.js";

const environment = process.env.NODE_ENV || "development";
let transporter;

if (environment === "production") {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ericjf.bayona@gmail.com",
            pass: "nfhzugurrdillfwt",
        },
    });
} else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
}

export const sendEmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `"Priotti Concep" <${envsConfig.MAIL_USER || "no-reply@example.com"}>`,
        to,
        subject,
        html,
    });

    if (environment !== "production") {
        console.log("📧 Vista previa de email (Ethereal):", nodemailer.getTestMessageUrl(info));
    }

    return info;
};
