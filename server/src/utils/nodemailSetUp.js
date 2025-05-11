// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: process.env.NODEMAIL_HOST,
//     port: Number(process.env.NODEMAIL_PORT),
//     secure: false, 
//     auth: {
//       user: process.env.NODEMAIL_USER,
//       pass: process.env.NODEMAIL_PASS,
//     },
// });

// export default transporter;

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'arisharehan7@gmail.com', // your email
    pass: 'lmofcpdapqpwmyye' // use an app password, not your regular password
  }
});

// Test the configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP server connection error:", error);
  } else {
    console.log("SMTP server connection established");
  }

});

export default transporter;

