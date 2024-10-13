// Import dotenv and load environment variables
import dotenv from 'dotenv';
dotenv.config(); // or just: import 'dotenv/config';

import nodemailer from 'nodemailer';

// Function to send an email
export const sendRegistrationEmail = async (userEmail) => {
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
      text: 'Welcome! You have successfully registered on our platform.',
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export const sendOrderDetails = async (userEmail) => {
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
        text: 'Hi! You have successfully completed the order.',
        data
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      return console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  export const sendDynamicEmail = async (user, orderDetails) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Order Confirmation - ${orderDetails.orderId}`,
        html: `
          <h1>Thank you for your order, ${user.name}!</h1>
          <p>Your order number is: <strong>${orderDetails.orderId}</strong></p>
          <p>Order total: <strong>${orderDetails.totalPrice}</strong></p>
          <ul>
            ${orderDetails.items
              .map(
                (item) =>
                  `<li>${item.name} - ${item.quantity} x ${item.price}</li>`
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