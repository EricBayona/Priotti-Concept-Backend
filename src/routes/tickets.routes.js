import { Router } from "express";
import ticketControler from "../controller/ticket.controler.js";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";
import { authorizeTicketOwner } from "../middlewares/autorizeTicketOwner.middleware.js";
import { authorizeUserByEmail } from "../middlewares/authorizeUserByEmail.middleware.js";



const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), ticketControler.getAllTickets);

router.get("/:tid", passportCall("jwt"), validateParamsObjectId("tid"), authorizeTicketOwner, ticketControler.getTicketById);

router.get("/user/:email", passportCall("jwt"), authorizeUserByEmail, ticketControler.getTicketByUser);

export default router;