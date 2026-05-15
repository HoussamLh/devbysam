const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

// Update path to find .env in the root folder
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Enable CORS for Live Server
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.log("Transporter connection error:", error);
  } else {
    console.log("Server is ready to take messages");
  }
});

// Route handler
app.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Project Inquiry from ${name} [${service}]`,
      html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #4a5d4a;">DevbySam Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Requested Service:</strong> ${service}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Success! Your message has been sent." });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start server for local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API is listening on http://localhost:${PORT}`);
});

module.exports = app;