import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = "product";

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: {
        type: Array,
        default: []
    },
    code: { type: String, unique: true },
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true
    },
});

productsSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection, productsSchema);