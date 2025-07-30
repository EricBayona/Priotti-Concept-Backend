import { cartModel } from "../models/cart.models.js";

export default class Cart {

    get = (params) => {
        return cartModel.find(params);
    };

    getBy = (params) => {
        return cartModel.findOne(params);
    };

    save = (doc) => {
        return cartModel.create(doc);
    };

    update = (id, doc) => {
        return cartModel.findByIdAndUpdate(id, { $set: doc }, { new: true, runValidators: true });
    };

    delete = (id) => {
        return cartModel.findByIdAndDelete(id);
    };

};