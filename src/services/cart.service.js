import Cart from "../presistencia/dao/cart.dao.js";
import CartRespository from "../repository/cart.repository.js";
import { productService } from "./productService.js";
import { v4 as uuidv4 } from 'uuid';
import { ticketService } from "./ticketService.js";



const repository = new CartRespository(new Cart());

class CartService {
    constructor(repository) {
        this.repository = repository
    };

    async createCart() {
        const newCart = await this.repository.create();
        return newCart;
    };
    async getAllCarts() {
        const carts = await this.repository.getAll();
        return carts;
    };
    async findCartById(cid) {
        const cart = await this.repository.getById(cid);
        return cart
    };
    async addProduct(cid, pid) {
        const cart = await this.repository.getById(cid);
        const product = await productService.getProductById(pid);
        if (!product) throw new Error("Product not found");
        const productInCart = cart.products.find((e) => e.product._id.toString() === pid);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        };
        const cartUpdate = await this.repository.update(cid, { products: cart.products });
        return cartUpdate;
    };
    async deleteProduct(cid, pid) {
        const cart = await this.repository.getById(cid);
        const product = cart.products.find((e) => e.product._id.toString() === pid);
        if (!product) throw new Error("Product not found in cart");
        cart.products = cart.products.filter((e) => e.product._id.toString() != pid);

        const cartUpdate = await this.repository.update(cid, { products: cart.products });
        return cartUpdate;
    };
    async updateQuantityProductInCart(cid, pid, quantity) {
        const cart = await this.repository.getById(cid);
        const productInCart = cart.products.find((e) => e.product._id.toString() === pid);
        if (!productInCart) throw new Error("Product not found in cart");
        productInCart.quantity = quantity;
        const cartUpdate = await this.repository.update(cid, { products: cart.products });
        return cartUpdate;
    };
    async clearCartProduct(cid) {
        const cart = await this.repository.update(cid, { products: [] });
        return cart;
    };
    async setQuantityOrAddProductToCart(cid, pid, quantity) {
        const cart = await this.repository.getById(cid);
        const product = await productService.getProductById(pid);
        if (!product) throw new Error("Product not found");

        const productInCart = cart.products.find((e) => {
            const prodId = typeof e.product === "object" ? e.product._id.toString() : e.product.toString();
            return prodId === pid;
        });

        if (productInCart) {
            productInCart.quantity = quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await this.repository.update(cid, { products: cart.products });
        return cart;
    };

    async replaceCartProducts(cid, products) {
        const cart = await this.repository.update(cid, { products: products });
        return cart
    };

    async purchaseCart(cid, purchaseEmail) {
        const cart = await this.repository.getById(cid);
        const productsPurchased = [];
        const productsOutOfStock = [];

        for (const item of cart.products) {
            const product = await productService.getProductById(item.product._id);

            if (!product) {
                productsOutOfStock.push({
                    product: item.product._id,
                    error: "Product not found"
                });
                continue;
            }
            const updatedProduct = await productService.updateStockIfAvailable(product._id, item.quantity);

            if (updatedProduct) {
                productsPurchased.push({
                    product: updatedProduct._id,
                    quantity: item.quantity,
                    price: updatedProduct.price,
                });
            } else {
                productsOutOfStock.push({
                    product: product._id,
                    requested: item.quantity,
                    available: product.stock,
                });
            };
        };

        let ticket = null;
        if (productsPurchased.length > 0) {
            const totalAmount = productsPurchased.reduce(
                (acc, item) => acc + item.quantity * item.price, 0
            );
            ticket = await ticketService.createTicket({
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: purchaseEmail,
                products: productsPurchased,
            });

            cart.products = cart.products.filter(item => !productsPurchased.find(p => p.product.toString() === item.product._id.toString()));

            await this.repository.update(cid, { products: cart.products });
        };
        const ticketSuccess = ticket && ticket.code;
        return {
            status: ticketSuccess ? "success" : "error",
            message: ticketSuccess
                ? `Compra finalizada. Ticket generado con código: ${ticket.code}`
                : "No se pudo generar ticket, sin stock suficiente.",
            ticket: ticketSuccess ? ticket : "No se pudo generar ticket, sin stock suficiente.",
            productsPurchased,
            productsOutOfStock,
        };
    };
};

export const cartService = new CartService(repository);