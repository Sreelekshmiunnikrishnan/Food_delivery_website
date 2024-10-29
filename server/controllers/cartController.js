import { Cart } from "../models/cartModel.js";
import { MenuItem } from "../models/menuModel.js";

export const getFromCart = async(req,res,next) =>{
    try {
        
        const {user} = req;
       
        const cart = await Cart.findOne({userId:user.id}).populate('menus.menuId');
        if(!cart){
            return res.json({message : 'cart is empty'});
        }
        res.json({ message :"cart details fetched", data :cart});
    } catch (error) {
        console.log(error);
        res.json(error.statusCode || 500).json( error.message || "Internal server error")
        
    }
};

export const addToCart = async(req,res) =>{
    try {
        
        const userId = req.user.id;
        const  {menuId} = req.body;

        const menu= await MenuItem.findById(menuId);
        if(!menu){
            return res.status(400).json({message : 'Item not found'});
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
        cart = new Cart({userId,menus: [] });

        }
        const menuExists = cart.menus.some((item) => item.menuId.equals(menuId));
        if(menuExists){
        return res.status(400).json({ message :"Item already exists in cart"});
        }

        cart.menus.push({
            menuId,
            menuName:menu.name,
            price : menu.price,
        });

        cart.calculateTotalPrice();

        await cart.save();
        res.status(200).json({message:"added to cart", data:cart})
    } catch (error) {
        console.log(error);
        res.json(error.statusCode || 500).json( error.message || "Internal server error")
        
    }
};

export const removeFromCart = async(req,res,next) =>{
    const  userId  = req.user.id;
    const { menuId } = req.body;
    
    try {
        let cart = await Cart.findOne({userId });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        console.log(menuId);
        
        cart.menus = cart.menus.filter((item) => !item.menuId == menuId);
        cart.calculateTotalPrice();
        await cart.save();
        
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
    
};

// Example of clearing cart data for a specific user
export const clearCart = async (req, res,next) => {
    const userId = req.user.id; // Assuming user is authenticated
    try {
      await CartModel.deleteOne({ userId: userId }); // Adjust to your cart schema
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart", error });
    }
  };
  