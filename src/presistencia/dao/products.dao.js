import { productModel } from "../models/product.models.js";

export default class Products {

    getAll = (filter = {}, options = {}) => {
        return productModel.paginate(filter, options);
    };

    getBy = (params) => {
        return productModel.findOne(params);
    };

    save = (doc) => {
        return productModel.create(doc);
    };

    update = (id, doc) => {
        return productModel.findByIdAndUpdate(id, { $set: doc }, { new: true, runValidators: true });
    };

    findOneAndUpdate = (filter, update, options) => {
        return productModel.findOneAndUpdate(filter, update, options);
    };

    delete = (id) => {
        return productModel.findByIdAndDelete(id);
    };

    getAllPaginated = (query, options) => {
        return productModel.paginate(query, options);
    };
};