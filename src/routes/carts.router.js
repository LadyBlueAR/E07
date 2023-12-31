import { Router } from 'express';
import CartsController from '../controllers/carts.controller.js';

const router = Router();

router.get('/', CartsController.getAllCarts);
router.get('/:cid', CartsController.getCartById);
router.post('/', CartsController.createCart);
router.post('/:cid/products/:pid', CartsController.addProductToCart);
router.put('/:cid/products/:pid', CartsController.updateProductInCart);
router.delete('/:cid/products/:pid', CartsController.deleteProductFromCart);
router.delete('/:cid', CartsController.deleteCart);

export default router;