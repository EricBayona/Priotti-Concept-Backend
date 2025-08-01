import { userModel } from "../models/user.model.js";

export default class Users {

    get = (params) => {
        return userModel.find(params);
    };

    getBy = (params) => {
        return userModel.findOne(params);
    };

    save = (doc) => {
        return userModel.create(doc);
    };

    update = (id, doc) => {
        return userModel.findByIdAndUpdate(id, { $set: doc }, { new: true, runValidators: true });
    };

    delete = (id) => {
        return userModel.findByIdAndDelete(id);
    };

    findByIdUpdate = (userId, newPassword) => {
        return userModel.findByIdAndUpdate(userId, newPassword);
    }

};