const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

// Load .env locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
  });
}

const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:3000",
      "https://devbysam.co.uk",
      "https://www.devbysam.co.uk",
    ],
    methods: ["GET", "POST", "OPTIONS"],
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
});

// Check SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Please fill all required fields",
      });
    }

    // Environment validation
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.RECEIVER_EMAIL
    ) {
      throw new Error("Missing email environment variables");
    }

    const mailOptions = {
      from: `"DevBySam Website" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,

      html: `
        <div style="
          font-family:Arial,sans-serif;
          max-width:600px;
          margin:auto;
          padding:20px;
          border:1px solid #ddd;
          border-radius:10px;
        ">

          <h2 style="color:#4a5d4a;">
            New DevBySam Inquiry
          </h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Phone:</strong>
          ${phone || "Not provided"}</p>

          <p><strong>Email:</strong>
          ${email}</p>

          <p><strong>Service:</strong>
          ${service || "Not specified"}</p>

          <hr>

          <h3>Message</h3>

          <p style="
            white-space:pre-wrap;
            line-height:1.6;
          ">
          ${message}
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Mail Error:", error);

    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
});

// Local server only
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
module.exports.default = app;