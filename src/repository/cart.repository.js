import GenericRepository from "./genericRepository.js";

export default class CartRespository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    getById = (cid) => {
        return this.dao.getBy({ _id: cid });
    };

};