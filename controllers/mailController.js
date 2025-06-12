const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

exports.sendMail = async (req, res) => {
  const { from, to, subject, text } = req.body;
  const file = req.file;

  // ✅ Validate Gmail addresses
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(from) || !emailRegex.test(to)) {
    return res.status(400).json({ message: 'Only @gmail.com addresses are allowed' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    // Add attachment if exists
    if (file) {
      mailOptions.attachments = [
        {
          filename: file.originalname,
          path: path.join(__dirname, '..', file.path),
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    // Optional: Delete the file after sending
    if (file) fs.unlinkSync(path.join(__dirname, '..', file.path));

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Email sending failed', error: err.message });
  }
};
