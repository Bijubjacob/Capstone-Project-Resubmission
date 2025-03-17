import express from 'express';
import nodemailer from 'nodemailer';  // Import Nodemailer

const router = express.Router();

// Create a transporter object using your email service provider settings
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail as an example
  auth: {
    user: process.env.EMAIL_USER,  // Replace with your email address
    pass: process.env.EMAIL_PASS,  // Replace with your email password or app-specific password
  },
});

// This route will handle the POST request from the frontend when the user submits their email.
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Sending the confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,  // Sender email
      to: email,                    // Recipient email (provided by the user)
      subject: 'Subscription Successful',
      text: `Thank you for subscribing to our newsletter! We'll keep you updated with our latest news and updates.`,
    });

    // Optionally, send a notification to the admin
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: process.env.ADMIN_EMAIL,  // Your admin email for notifications
    //   subject: 'New Subscription',
    //   text: `A new user has subscribed with the email: ${email}`,
    // });

    // Example of sending a successful response
    return res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error processing your subscription' });
  }
});

export default router;
