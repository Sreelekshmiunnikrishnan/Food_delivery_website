import e from "express";
import { createMenu, deleteMenu, getMenu, getMenuItems, updateMenu,ownerMenu } from "../controllers/menuItemController.js";
import { authRestOwner } from "../middlewares/authRestOwner.js";
import {authUser} from "../middlewares/authUser.js";
import { upload} from  "../middlewares/multer.js";
const router = e.Router();
router.post("/create",authRestOwner, upload.single('image'),createMenu)
router.get("/getmenuitems",getMenuItems)
router.get("/getmenu/:id",getMenu)
router.put("/updatemenu/:id",authRestOwner, upload.single('image'), updateMenu)
router.delete("/deletemenu/:id",authRestOwner,deleteMenu)
router.get('/getOwnMenu', authRestOwner,ownerMenu);
export {router as MenuRouter};