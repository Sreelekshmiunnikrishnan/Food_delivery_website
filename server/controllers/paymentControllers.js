import express from 'express';
const router = express.Router();
import Stripe from "stripe";
const stripe = new Stripe(process.env.Stripe_Private_Api_key);
const client_domain = process.env.CLIENT_DOMAIN;
export const createPayment = async(req,res,next)=>{
    try {
        const { products} = req.body;
            const lineItems = products.map((product) =>({
                price_data : {

                    currency :"inr",
                    product_data :{
                        name: product?.menuId?.name,
                        images : [product?.menuId?.image],
                    },
                    unit_amount : Math.round(product?.menuId?.price * 100),
                },
                quantity : 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types :["card"],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
          });
        
          res.send({sucess:true,sessionId : session.id});
    } catch (error) {
        res.json({error});
        
    }
    
}
export const sessionstatus =async(req,res) =>{
    try {
        const sessionId = req.query.session.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.send({
            status : session.status,
            customer_email: session?.customer_details?.email,
        });
    } catch (error) {
        res.status(error ?.sttatusCode || 500).json(error.message || "Internal server error");

    }

}
