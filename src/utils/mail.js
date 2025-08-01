import { sendEmail } from "../services/email.serivce.js";

export const sendRecoveryMail = async (to, link) => {
    const subject = "Recuperacion de Contraseña";
    const html = `
        <p>Hacé click en el siguiente enlace para recuperar tu contraseña:</p>
        <a href="${link}">${link}</a>
    `;

    await sendEmail({ to, subject, html })
}