import { ticketService } from "../services/ticketService.js"
import { logger } from "../utils/logger.js";


const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json({ status: "success", payload: tickets });
    } catch (error) {
        logger.error(`Error en Get/tickets - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

const getTicketById = async (req, res) => {
    const { tid } = req.params;
    try {
        const ticket = await ticketService.getTicketById(tid);
        if (!ticket) {
            return res.status(404).json({ status: "error", message: "Ticket not found" });
        };
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        logger.error(`Error en Get/tickets - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getTicketByUser = async (req, res) => {
    const { email } = req.params;
    try {
        const ticket = await ticketService.getTicketByUser(email);
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        logger.error(`Error en Get/tickets - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
}
export default {
    getAllTickets,
    getTicketById,
    getTicketByUser
}