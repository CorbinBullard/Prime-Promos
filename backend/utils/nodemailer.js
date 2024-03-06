const nodemailer = require("nodemailer");


// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "troy.roob@ethereal.email",
//     pass: "FNREzbEWVvnMg6GGhu",
//   },
// });

// async function sendInvitationEmail(email, link) {
//   console.log("email ", email);

//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: email, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
//   console.log("GOT HERE");

//   console.log("Message sent: %s", info.messageId);
//   //   Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }
// module.exports = { sendInvitationEmail };
