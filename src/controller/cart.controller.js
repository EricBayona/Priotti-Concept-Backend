import { cartService } from "../services/cart.service.js"
import { sendEmail } from "../services/email.serivce.js";
import { logger } from "../utils/logger.js";

const getAllCarts = async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        res.send({ status: "success", payload: carts })
    } catch (error) {
        logger.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getMyCart = async (req, res) => {
    try {
        const userCartId = req.user.cart;
        const cart = await cartService.findCartById(userCartId);
        if (!cart) {
            return res.status(404).json({ status: "Error", message: "cart not found" });
        }
        logger.info(`GET /carts/${userCartId} - cart successfully fetched`);
        res.send({ status: "success", payload: cart });
    } catch (error) {
        logger.error(`GET /cart/${userCartId} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getCartId = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartService.findCartById(cid);
        if (!cart) {
            logger.info("cart not found");
            return res.status(404).json({ status: "error", message: "cart not found" })
        }
        logger.info(`GET /carts/${cid} - cart successfully fetched`);
        res.send({ status: "success", payload: cart });
    } catch (error) {
        logger.error(`GET /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cartupdate = await cartService.addProduct(cid, pid);
        logger.info(`POST /carts/${cid} - addProductToCart ok`);
        res.send({ status: "success", payload: cartupdate })
    } catch (error) {
        if (error.message === "Product not found") {
            res.status(404).json({ status: "error", message: "product not found" });
            logger.warn(`Post/carts/${cid} - ${error.message}`);
            return;
        }
        logger.error(`Post /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const deleteProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cartUpdate = await cartService.deleteProduct(cid, pid);
        logger.info(`DELETE /carts/${cid} - deleteProductToCart ok`);
        res.send({ status: "success", payload: cartUpdate })

    } catch (error) {
        if (error.message === "Product not found in cart") {
            logger.warn(`Post/carts/${cid} - ${error.message}`);
            res.status(404).json({ status: "error", message: error.message });
            return;
        }
        logger.error(`Delete /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const updateQuantityProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cartUpdate = await cartService.updateQuantityProductInCart(cid, pid, quantity);
        logger.info(`PUT /carts/${cid} -updateQuantityProductInCart ok`);
        res.send({ status: "success", payload: cartUpdate })
    } catch (error) {
        if (error.message === "Product not found in cart") {
            logger.warn(`PUT/carts/${cid} - ${error.message}`);
            res.status(404).json({ status: "error", message: error.message });
            return;
        }
        logger.error(`Post /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const clearCartProduct = async (req, res) => {
    const { cid } = req.params;
    try {
        const clearCart = await cartService.clearCartProduct(cid);
        logger.info(`DELETE/carts/${cid} -clearCartProduct ok`);
        res.send({ status: "success", message: "Empty cart", payload: clearCart })

    } catch (error) {
        logger.error(`Delete /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const addMultipleProductsToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ status: "error", message: "Array de productos inválido o vacío" });
        }

        for (const p of products) {
            if (!p.pid || typeof p.quantity !== "number" || p.quantity < 1) {
                return res.status(400).json({ status: "error", message: "Cada producto debe tener un pid y quantity >= 1" });
            }
        }
        await Promise.all(
            products.map(({ pid, quantity }) =>
                cartService.setQuantityOrAddProductToCart(cid, pid, quantity)
            )
        );
        const updatedCart = await cartService.findCartById(cid);

        return res.status(200).json({
            status: "success",
            message: "Productos agregados correctamente al carrito",
            payload: updatedCart
        });

    } catch (error) {
        next(error);
    };
};

const createCart = async (req, res) => {
    try {
        const newCart = await cartService.createCart();
        res.send({ status: "success", message: "new cart", payload: newCart });

    } catch (error) {
        logger.error(`Delete /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const replaceCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const updatedCart = await cartService.replaceCartProducts(cid, products);
        res.status(200).json({ status: "success", payload: updatedCart });
    } catch (error) {
        logger.error(`Put /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const sendPurchaseEmail = async (userEmail, ticketData) => {
    const htmlContent = `
    <h2>¡Gracias por tu compra!</h2>
    <p>Este es tu ticket: <strong>${ticketData.code}</strong></p>
    <p>Monto: $${ticketData.amount}</p>
    <p>Fecha: ${ticketData.purchase_datetime}</p>
  `;

    await sendEmail({
        to: userEmail,
        subject: "Confirmación de compra",
        html: htmlContent,
    });
};

const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    const email = req.user.email;
    try {
        const result = await cartService.purchaseCart(cid, email);



        await sendPurchaseEmail(email, result.ticket);
        res.status(200).json({ status: "success", message: "Purchase completed", payload: result })

    } catch (error) {
        logger.error(`Post /cart/${cid} - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};



export default {
    getAllCarts,
    getMyCart,
    getCartId,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearCartProduct,
    addMultipleProductsToCart,
    createCart,
    replaceCart,
    purchaseCart,
    sendPurchaseEmail,
};