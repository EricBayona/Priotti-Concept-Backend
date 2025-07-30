import { ticketModel } from "../models/ticket.models.js";

export default class Ticket {

    get = (params) => {
        return ticketModel.find(params);
    };

    getBy = (params) => {
        return ticketModel.findOne(params);
    };

    save = (doc) => {
        return ticketModel.create(doc);
    };

    update = (id, doc) => {
        return ticketModel.findByIdAndUpdate(id, { $set: doc }, { new: true, runValidators: true });
    };

    delete = (id) => {
        return ticketModel.findByIdAndDelete(id);
    };

    find = (filter = {}) => {
        return ticketModel.find(filter).lean();
    }
};