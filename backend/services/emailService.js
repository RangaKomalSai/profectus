import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Function to send email
async function sendEmail(recipientEmail, subject, body) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PSWD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: recipientEmail,
    // subject:
    //   "Verification OTP for registering to Profectus | Abhyuday, IIT Bombay",
    subject: subject,
    // text: `Your OTP for verification is ${otp}`,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email");
  }
}

export { sendEmail };
