import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY);
const client_domain = process.env.CLIENT_DOMAIN;
console.log("Stripe API Key:", stripe);

export const createPayment = async (req, res, next) => {
    try {
        const { products, discount } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "No products provided" });
        }

        // Map products to Stripe line items with discount applied if provided
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product?.menuId?.name || "Unknown Product",
                    id:product?.menuId,
                    images: product?.menuId?.image ? [product.menuId.image] : [],
                },
                unit_amount: Math.round(product?.menuId?.price * 100 || 0),
            },
            quantity: product.quantity || 1,
        }));

        // Adjust prices for discount by applying it to each line item
        const discountedLineItems = lineItems.map(item => {
            const discountedAmount = discount > 0
                ? item.price_data.unit_amount - Math.round(item.price_data.unit_amount * discount / 100)
                : item.price_data.unit_amount;
            return {
                ...item,
                price_data: {
                    ...item.price_data,
                    unit_amount: discountedAmount
                }
            };
        });

       /*  const domain = process.env.NODE_ENV === 'production' 
            ? client_domain 
            : 'http://localhost:5173'; */

        // Create the Stripe session without payment_intent_data
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: discountedLineItems,
            mode: 'payment',
            success_url: `${client_domain}/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });

        console.log("Line Items:", discountedLineItems);
        console.log("Session ID:", session.id);

        res.status(200).json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("Error creating payment session:", error);
        res.status(500).json({ error: "Failed to create payment session" });
    }
};

export const sessionstatus = async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'],
        });

        const products = session.line_items.data.map(item => ({
            price_data: {
                currency: item.price.currency,
                product_data: {
                    name: item.description,
                    images: item.price.product?.images || [],
                },
                unit_amount: item.price.unit_amount,
            },
            quantity: item.quantity,
        }));

        res.status(200).json({
            status: session.status,
            customer_email: session.customer_details?.email,
            products,
        });
    } catch (error) {
        console.error("Error retrieving session status:", error);
        res.status(error?.statusCode || 500).json({
            error: error.message || "Internal server error",
        });
    }
};
