const nodemailer = require("nodemailer");

export async function sendEmail() {
  // Create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // or "outlook", "yahoo", etc.
    auth: {
      user: "dhruvrastogi2020@gmail.com",
      pass: "ggdg kdux suak tmbd", // use app password, not raw email password
    },
  });

  // Email options
  let mailOptions = {
    from: "dhruvrastogi2020@gmail.com",
    to: "dhrurast@gmail.com",
    subject: "Hello from Node.js",
    text: "This is a test email sent using Node.js and Nodemailer 🚀",
  };

  // Send mail
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error:", error);
  }
}

sendEmail();
