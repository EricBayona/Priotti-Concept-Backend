import { Router } from "express";
import { passportCall } from "../middlewares/passporCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import productControler from "../controller/productControler.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { createProductSchema } from "../schemas/product.shema.js";
import { validateProductQuery } from "../schemas/validateProductQuery.schema.js";
import { editProductSchema } from "../schemas/editProduct.shema.js";
import { validateParamsObjectId } from "../middlewares/validateParamsObjectId.middleware.js";
import { multerUploaderMiddleware } from "../middlewares/multerUploader.middlewares.js";

const router = Router();

router.post("/", passportCall("jwt"), authRole(["admin"]), multerUploaderMiddleware.array("thumbnails", 3), validateSchema({ body: createProductSchema }), productControler.createProducts);

router.get("/", validateSchema({ query: validateProductQuery }), productControler.getAllProducts);

router.get("/:pid", validateParamsObjectId("pid"), productControler.getByProduct);

router.put("/:pid", passportCall("jwt"), authRole(["admin"]), validateSchema({ body: editProductSchema }), validateParamsObjectId("pid"), productControler.updateProduct);

router.delete("/:pid", passportCall("jwt"), authRole(["admin"]), validateParamsObjectId("pid"), productControler.deleteProduct);





export default router;
