import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAIL_HOST,
    port: Number(process.env.NODEMAIL_PORT),
    secure: false, 
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
});

export default transporter;

