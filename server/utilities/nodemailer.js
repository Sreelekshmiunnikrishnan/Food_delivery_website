// Import dotenv and load environment variables
import dotenv from 'dotenv';
dotenv.config(); // or just: import 'dotenv/config';

import nodemailer from 'nodemailer';

// Function to send an email
export const sendRegistrationEmail = async (userEmail,name) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Registration Successful!',
      text: `Welcome ${name}! You have successfully registered on Foodigo app.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export const sendOrderDetails = async (userEmail,name) => {
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASS, // your email password
        },
      });
  
      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Order details',
        text: `Hi ${name}! You have successfully completed the order.`,
        data
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      return console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  export const sendDynamicEmail = async (user, newuser,orderDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
            auth: {
              user: process.env.EMAIL_USER, // your email
              pass: process.env.EMAIL_PASS, // your email password
            },
          });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newuser.email,
        subject: `Order Confirmation - ${user}`,
        html: `
          <h1>Thank you for your order, ${newuser.name}!</h1>
          <p>Your order number is: <strong>${orderDetails.id}</strong></p>
          <p>Order total: <strong>${orderDetails.totalPrice}</strong></p>
         <p>Delivery Address: <strong>${orderDetails.deliveryAddress}</strong></p>
         <p>Delivery time: <strong>${orderDetails.deliveryTime}</strong></p>
         
        <ul>
            ${orderDetails.items
              .map(
                (item) =>
                  `<li>${orderDetails.menuName} - ${orderDetails.quantity} x ${item.price}</li>`
              )
              .join('')}
          </ul>

          <p>We hope to see you again soon!</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Dynamic HTML email sent successfully');
    } catch (error) {
      console.error('Error sending dynamic HTML email:', error);
    }
  };