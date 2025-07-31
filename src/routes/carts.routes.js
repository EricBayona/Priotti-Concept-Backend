import { Router } from "express";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import cartController from "../controller/cart.controller.js";
import { authCartOwner } from "../middlewares/authCartOwner.middleware.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateQuantity } from "../schemas/validateQuantity.schema.js";
import { validateCartProducts } from "../schemas/validateCartProducts.schema.js";


const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), cartController.getAllCarts);

router.get("/mycart", passportCall("jwt"), authRole(["user", "admin"]), cartController.getMyCart);

router.get("/:cid", passportCall("jwt"), authCartOwner, validateParamsObjectId("cid"), cartController.getCartId);

router.post("/:cid/product/:pid", passportCall("jwt"), validateParamsObjectId("cid", "pid"), authCartOwner, cartController.addProductToCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), validateParamsObjectId("cid", "pid"), authCartOwner, cartController.deleteProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), validateParamsObjectId("cid", "pid"), authCartOwner, validateSchema({ body: validateQuantity }), cartController.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), validateParamsObjectId("cid"), authCartOwner, cartController.clearCartProduct);

router.post("/:cid/products", passportCall("jwt"), validateParamsObjectId("cid"), authCartOwner, cartController.addMultipleProductsToCart);

router.post("/", passportCall("jwt"), authRole(["admin"]), cartController.createCart);

router.put("/:cid", passportCall("jwt"), validateParamsObjectId("cid"), authCartOwner, validateSchema({ body: validateCartProducts }), cartController.replaceCart);

router.post("/:cid/purchase", passportCall("jwt"), validateParamsObjectId("cid"), authCartOwner, cartController.purchaseCart);

export default router;