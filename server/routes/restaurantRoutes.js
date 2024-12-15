import e from "express";

import { create, deleteRestaurant, getAllRestaurants, getRestaurant, ownerRestaurant, updateRestaurant } from "../controllers/restaurantController.js";
import { authRestOwner } from "../middlewares/authRestOwner.js";
import { authUser } from "../middlewares/authUser.js";
import { upload } from "../middlewares/multer.js";
import { getMenus } from "../controllers/menuItemController.js";
const router = e.Router();



// Create a new restaurant
router.post('/create',authRestOwner,create);

// Get all restaurants
router.get('/getAllRestaurants', getAllRestaurants);
//Get menus of a restaurant
router.get('/getmenu/:id', getMenus);

// Get a restaurant by ID
router.get('/getRestaurant/:id',authUser, getRestaurant);

// Update a restaurant by ID
router.put('/updateRestaurant/:id',authRestOwner, updateRestaurant);
router.get('/getOwnRestaurant', authRestOwner,ownerRestaurant);
// Delete a restaurant by ID
router.delete('/deleteRestaurant/:id',authRestOwner, deleteRestaurant);

export {router as restaurantRouter};
