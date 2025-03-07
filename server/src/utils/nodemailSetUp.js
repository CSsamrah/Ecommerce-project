import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAIL_HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
});

export default transporter;

