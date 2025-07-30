import GenericRepository from "./genericRepository.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    getAll = (query = {}, options = {}) => {
        return this.dao.getAll(query, options);
    };
    updateStockIfAvailable = (productId, quantity) => {
        return this.dao.findOneAndUpdate(
            { _id: productId, stock: { $gte: quantity } },
            { $inc: { stock: -quantity } },
            { new: true }
        );
    }
};