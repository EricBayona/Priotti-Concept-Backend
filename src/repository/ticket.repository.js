import GenericRepository from "./genericRepository.js";

export default class TicketRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    getByTid = (tid) => {
        return this.dao.getBy({ _id: tid });
    };
    getTicketByUser = (email) => {
        return this.dao.find({ purchaser: email }).lean();
    };
};