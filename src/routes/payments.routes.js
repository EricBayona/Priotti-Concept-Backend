// routes/payments.routes.js
import { Router } from "express";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authCartOwner } from "../middlewares/authCartOwner.middleware.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";
import paymentController from "../controller/payment.controller.js";

const router = Router();

router.post("/:cid", passportCall("jwt"), validateParamsObjectId("cid"), authCartOwner, paymentController.createPayment);

export default router;
