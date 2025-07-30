import { Router } from "express";
import userController from "../controller/user.controller.js";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { authSelfOrRole } from "../middlewares/authSelfOrRole.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { editUserShema } from "../schemas/editUSerschema.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";

const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), userController.getAllUsers);

router.get("/:uid", passportCall("jwt"), authRole(["admin"]), validateParamsObjectId("uid"), userController.getUserById);

router.put("/:uid", passportCall("jwt"), authSelfOrRole(["admin"]), validateSchema({ body: editUserShema }), validateParamsObjectId("uid"), userController.updateUserById);

router.delete("/:uid", passportCall("jwt"), authRole(["admin"]), validateParamsObjectId("uid"), userController.deleteUserById);

export default router;