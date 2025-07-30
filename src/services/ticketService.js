import Ticket from "../presistencia/dao/ticket.dao.js";
import TicketRepository from "../repository/ticket.repository.js";



const repository = new TicketRepository(new Ticket());

class TicketService {
    constructor(repository) {
        this.repository = repository;
    };

    async createTicket(data) {
        return await this.repository.create(data);
    };
    async getAllTickets() {
        return await this.repository.getAll({});;

    };
    async getTicketById(tid) {
        return await this.repository.getByTid(tid);
    };
    async getTicketByUser(email) {
        return await this.repository.getTicketByUser(email);
    }
};

export const ticketService = new TicketService(repository);