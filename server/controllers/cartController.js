import { Cart } from "../models/cartModel.js";
import { MenuItem } from "../models/menuModel.js";

export const getFromCart = async(req,res,next) =>{
    try {
        
        const {user} = req;
       
        const cart = await Cart.findOne({userId:user.id}).populate('menus.menuId');
        if(!cart){
            return res.status(404).json({message : 'cart is empty'});
        }
        res.status(200).json({ message :"cart details fetched", data :cart});
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
            return res.status(404).json({message : 'Item not found'});
        }

        let cart = await Cart.findOne({userId});
        if(!cart){
        cart = new Cart({userId,menus: [] });

        }
        const menuExists = cart.menus.some((item) => item.menuId.equals(menuId));
        if(menuExists){
        return res.status(409).json({ message :"Item already exists in cart"});
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
      
        // Remove item explicitly without filter or splice
        cart.menus = cart.menus.reduce((acc, item) => {
            console.log("Checking item menuId:", item.menuId);
            if (item.menuId.toString() !== menuId.toString()) {
                acc.push(item);
            }
            return acc;
        }, []);

        //console.log("Cart after item removal:", cart.menus);

        cart.calculateTotalPrice();
        await cart.save();
        console.log("Cart after save:", cart);
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
  

   export const couponDiscount = async (req, res,next) => {
    const { couponCode } = req.body;
    const coupons = [
        {
          code: "DISCOUNT10",
          discount: 10, // 10% off
          type: "percentage", // Type of discount: "percentage" or "fixed"
          expirationDate: new Date("2024-12-31"), // Expiration date
        },
        {
          code: "OFF100",
          discount: 100, // ₹100 off
          type: "fixed", // Fixed discount amount
          expirationDate: new Date("2024-12-31"),
        },
      ];
    // Validate the coupon code (this could involve checking a database or predefined list)
    if (!couponCode) {
        return res.status(400).json({ message: "Coupon code is required" });
      }
    
      // Find the coupon from the list (or database)
      const coupon = coupons.find(c => c.code === couponCode);
    
      // Check if coupon exists
      if (!coupon) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }
    
      // Check if coupon has expired
      if (coupon.expirationDate < new Date()) {
        return res.status(400).json({ message: "Coupon has expired" });
      }
    
      // Apply the discount based on the coupon type
      let discountAmount = 0;
      if (coupon.type === "percentage") {
        discountAmount = coupon.discount; // Percentage discount
      } else if (coupon.type === "fixed") {
        discountAmount = coupon.discount; // Fixed amount discount
      }
    
      return res.json({ discount: discountAmount, type: coupon.type });
    
};
