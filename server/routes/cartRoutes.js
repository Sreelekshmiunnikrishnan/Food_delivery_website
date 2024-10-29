import e from 'express';
import { addToCart, clearCart, getFromCart, removeFromCart } from '../controllers/cartController.js';
import {authUser} from '../middlewares/authUser.js';
const router = e.Router();

router.post('/add-to-cart',authUser,addToCart);
router.get('/getcart',authUser,getFromCart);
router.delete('/remove-menu',authUser,removeFromCart);
router.post("/cart/clear", authUser,clearCart);
export {router as cartRouter};