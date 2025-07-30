import mongoose from "mongoose";
import { userService } from "../services/userService.js"
import { logger } from "../utils/logger.js";


const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        logger.info("GET /users - listado recuperado");
        res.status(200).send({ status: "success", payload: users });

    } catch (error) {
        logger.error(`Error en GET /users - ${error.message}\n${error.stack}`)
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.uid;

        const user = await userService.getUserById(userId);
        if (!user) {
            logger.info(`GET /users/${userId} - usuario no encontrado`);
            return res.status(400).send({ status: "error", message: "User not found" });
        }
        logger.info(`GET /users/${userId} - usuario encontrado`);
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        logger.error(`Error en GET /users/${userId} - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const updateUserById = async (req, res) => {
    const updateData = req.body;
    const userId = req.params.uid;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            logger.info(`PUT /users/${userId} - usuario no encontrado`);
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        const result = await userService.update(userId, updateData);
        logger.info(`PUT /users/${userId} - usuario actualizado`);
        res.status(200).send({ status: "success", payload: result })

    } catch (error) {
        logger.error(`Error en PUT /users/${userId} - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};

const deleteUserById = async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            logger.info(`DELETE /users/${userId} - usuario no encontrado`);
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        await userService.delete(userId);
        logger.info(`DELETE /users/${userId} - usuario eliminado`);
        res.status(200).send({ status: "success", message: `User id remove` })
    } catch (error) {
        logger.error(`Error en DELETE /users/${userId} - ${error.message}\n${error.stack}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    };
};



export default {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}