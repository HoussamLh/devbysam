const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

// locally path and Vercel handles envs auto.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
} else {
  require("dotenv").config();
}

const app = express();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://your-vercel-domain.vercel.app",
    ],
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
});

// Route handler (Keep as is, it's good!)
app.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    // Safety check for environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials missing in environment");
    }

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
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ONLY listen if running locally. Vercel ignores this.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API is listening on http://localhost:${PORT}`);
  });
}

module.exports = app;