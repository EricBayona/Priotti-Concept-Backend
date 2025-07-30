import { productService } from "../services/productService.js";
import { logger } from "../utils/logger.js";
import path from 'path';
import fs from 'fs';


const createProducts = async (req, res) => {
    const product = req.body;
    const files = req.files;
    if (files) {
        const imagePaths = files.map(file => `/images/products/${file.filename}`)
        product.thumbnails = imagePaths;
    }
    try {
        const newProduct = await productService.createProduct(product);
        res.status(201).json({ status: "succes", payload: newProduct });
    } catch (error) {
        if (error.message.includes("duplicate code")) {
            return res.status(400).json({ status: "error", message: "duplicate code" });
        };
        logger.error(`Error en POST /products - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        logger.info("GET /products - List successfully fetched");
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        logger.error(`Error en GET /products - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getByProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productService.getProductById(pid);
        logger.info("GET /products - Product successfully fetched");
        res.status(200).json({ status: "success", payload: product })


    } catch (error) {
        if (error.statusCode === 404) {
            logger.info(`GET /products/${req.params.pid} - product not found`);
            return res.status(404).json({ status: "error", message: error.message });
        }
        logger.error(`Error en GET /:pid - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const updateProduct = async (req, res) => {
    const pid = req.params.pid;
    const data = req.body;
    try {
        const product = await productService.getProductById(pid);
        const updatedProduct = await productService.updateProduct(pid, data);
        logger.info("PUT /product - Product updated");
        res.status(200).json({ status: "success", payload: updatedProduct })

    } catch (error) {
        if (error.statusCode === 404) {
            logger.info(`GET /product/${req.params.pid} - product not found`);
            return res.status(404).json({ status: "error", message: error.message });
        }
        logger.error(`Error en PUT /:pid - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    try {
        const product = await productService.getProductById(pid);
        const thumbnails = Array.isArray(product?.thumbnails) ? product.thumbnails : [product?.thumbnails];
        thumbnails.forEach((thumb) => {
            if (thumb) {
                const imagePath = path.join('src/public', thumb);
                fs.unlink(imagePath, (err) => {
                    if (err) logger.error("Error al eliminar imagen:", err);
                });
            }
        });
        const deleteProduct = await productService.deleteProduct(pid);
        logger.info(`DELETE /products/${req.params.pid} - Product successfully deleted`);
        return res.status(200).json({ status: "success", message: "Product successfully deleted" });
    } catch (error) {
        if (error.statusCode === 404) {
            logger.info(`GET /product/${req.params.pid} - product not found`);
            return res.status(404).json({ status: "error", message: error.message });
        }
        logger.error(`Error en PUT /:pid - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}


export default {
    createProducts,
    getAllProducts,
    getByProduct,
    updateProduct,
    deleteProduct
}