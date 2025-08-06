// controller/payment.controller.js
// 'APP_USR-6851407173612960-012517-43a164ad7c27d0ae140e90f5f204f587-611598375'
import { cartService } from "../services/cart.service.js";
import { paymentService } from "../services/payment.service.js";
import { logger } from "../utils/logger.js";

const createPayment = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.findCartById(cid);
        if (!cart || cart.products.length === 0) {
            return res.status(404).json({ status: "error", message: "Carrito vacío o no encontrado" });
        }

        const preference = await paymentService.createPreference(cart);
        res.status(200).json({ status: "success", init_point: preference.init_point });
    } catch (error) {
        logger.error(`POST /payments/${cid} - ${error.message}\n${error.stack}`);

        // Mostralo también en la respuesta mientras estás en desarrollo
        res.status(500).json({
            status: "error",
            message: "Error creando preferencia de pago",
            details: error.message  // 👈 este es clave para depurar
        });
    }
};

export default {
    createPayment
};
