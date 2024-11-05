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
        console.log(lineItems);
        console.log(session.id);
          res.status(200).send({sucess:true,sessionId : session.id});
    } catch (error) {
        res.status(500).json({error : "Failed to create payment session"});
        
    }
    
}
export const sessionstatus =async(req,res) =>{
    try {
        const sessionId = req.query.session_id; // Correctly retrieve session_id from query
        const session = await stripe.checkout.sessions.retrieve(sessionId,{
            expand: ['line_items'] // Expand to include line_items
        });

        res.send({
            status: session.status,
            customer_email: session.customer_details?.email,
            products: session.line_items.data.map(item => ({
                price_data: {
                    currency: item.price.currency,
                    product_data: {
                        name: item.description,
                        images: item.price.product.images,
                    },
                    unit_amount: item.price.unit_amount,
                },
                quantity: item.quantity,
            }))
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json({
            error: error.message || "Internal server error",
        });
    }
};
