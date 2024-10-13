import e from 'express';
import { addToCart, getFromCart, removeFromCart } from '../controllers/cartController.js';
import {authUser} from '../middlewares/authUser.js';
const router = e.Router();

router.post('/add-to-cart/:id',authUser,addToCart);
router.get('/getcart',authUser,getFromCart);
router.delete('/delete',authUser,removeFromCart);

export {router as cartRouter};