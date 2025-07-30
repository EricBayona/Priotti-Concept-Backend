import { ticketService } from "../services/ticketService.js";

export const authorizeTicketOwner = async (req, res, next) => {
    try {
        const ticketId = req.params.tid;
        const ticket = await ticketService.getTicketById(ticketId);
        if (!ticket) return res.status(404).json({ status: "error", msg: "Ticket no encontrado" });

        const user = req.user;


        if (user.role === "admin") return next();
        if (ticket.purchaser.toString() !== user.email.toString()) {
            return res.status(403).json({ status: "error", msg: "No estás autorizado para ver este ticket" });
        }

        next();
    } catch (error) {
        console.error("Error de autorización de ticket:", error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
};
