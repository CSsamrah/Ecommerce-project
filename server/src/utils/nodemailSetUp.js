import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "829d54004@smtp-brevo.com",
      pass: "xsmtpsib-f863621edfa416b8a9d621e20c1acf8a91a48961b0df3c5aaa952fa861a12879-H0SImPG2BUtWdYwA",
    },
});

export default transporter;

