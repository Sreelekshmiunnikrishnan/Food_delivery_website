import e from "express";
import { createMenu, deleteMenu, getMenu, getMenuItems, updateMenu } from "../controllers/menuItemController.js";
import { authRestOwner } from "../middlewares/authRestOwner.js";

const router = e.Router();
router.post("/create",authRestOwner,createMenu)
router.get("/getmenuitems",authRestOwner,getMenuItems)
router.get("/getmenu/:id",authRestOwner, getMenu)
router.put("/updatemenu/:id",authRestOwner, updateMenu)
router.delete("/deletemenu/:id",authRestOwner,deleteMenu)

export {router as MenuRouter};