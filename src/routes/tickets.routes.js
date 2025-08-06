import { Router } from "express";
import ticketControler from "../controller/ticket.controler.js";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";
import { authorizeTicketOwner } from "../middlewares/autorizeTicketOwner.middleware.js";

const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), ticketControler.getAllTickets);

router.get("/my", passportCall("jwt"), ticketControler.getTicketByUser);

router.get("/:tid", passportCall("jwt"), validateParamsObjectId("tid"), authorizeTicketOwner, ticketControler.getTicketById);

export default router;