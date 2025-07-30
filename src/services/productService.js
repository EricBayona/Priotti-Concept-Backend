import Products from "../presistencia/dao/products.dao.js";
import ProductRepository from "../repository/product.repository.js";
import { logger } from "../utils/logger.js";

const repository = new ProductRepository(new Products());

class ProductService {
    constructor(repository) {
        this.repository = repository;
    };

    async createProduct(product) {
        try {
            const newProduct = await this.repository.create(product);
            logger.info("POST /products - Product created");
            return newProduct;
        } catch (error) {
            if (error.code === 11000) {
                logger.warn("POST /products - Error duplicate code");
                throw new Error("POST /products - Error duplicate code");
            }
            throw new Error("error creating the product");
        }
    };

    async getAllProducts(queryParams) {
        const { limit, page, sort, category, status } = queryParams;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            lean: true,
        };

        try {
            if (category) {
                return await this.repository.getAll({ category }, options);
            };
            if (status) {
                return await this.repository.getAll({ status }, options);
            };

            return await this.repository.getAll({}, options);
        } catch (error) {
            throw new Error("Error obtaining products.")
        }
    };

    async getProductById(pid) {
        const product = await this.repository.getBy({ _id: pid })
        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }
        return product
    };

    async updateProduct(pid, data) {
        const productUpdate = await this.repository.update(pid, data);
        return productUpdate;
    };

    async deleteProduct(pid) {
        const deleteProduct = await this.repository.delete(pid);
        return deleteProduct
    };

    async updateStockIfAvailable(id, quantity) {
        const updateProduct = await this.repository.updateStockIfAvailable(id, quantity);
        return updateProduct
    };
};

export const productService = new ProductService(repository);