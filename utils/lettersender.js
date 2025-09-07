import nodemailer from "nodemailer";

export async function sendEmail(sub, body) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dhruvrastogi2020@gmail.com",
      pass: "ggdg kdux suak tmbd",
    },
  });

  let mailOptions = {
    from: "dhruvrastogi2020@gmail.com",
    to: "dhrurast@gmail.com",
    subject: sub,
    text: body,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error:", error);
  }
}

