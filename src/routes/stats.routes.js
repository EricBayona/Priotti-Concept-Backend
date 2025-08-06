import { Router } from "express";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import statsController from "../controller/stats.controller.js";

const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), statsController.getStats);


export default router;