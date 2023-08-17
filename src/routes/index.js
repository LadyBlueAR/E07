import { Router } from "express";
import sessionRouter from "./sessions.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/sessions', sessionRouter);

export default router;