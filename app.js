const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// POST route to send mail
app.post('/send', (req, res) => {
    console.log('🪵  req.body  👉', req.body);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).send("All fields are required.");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'flickshot01234@gmail.com',
            pass: 'cbam uuhu cvrt riks' // Use an App Password, not your Gmail password
        }
    });

    const mailOptions = {
        from: email,
        to: 'flickshot01234@gmail.com',
        subject: `Portfolio Contact - ${subject}`,
        html: `
      <h3>You received a new message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Failed to send email.");
        }
        // res.send("Message sent successfully.");
        res.sendFile(path.join(__dirname, 'public', 'send.html'));
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
