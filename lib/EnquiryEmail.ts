// Import Request, Response, and NextFunction from express instead of "next"
// @ts-nocheck

import nodemailer from "nodemailer";
import prismadb from "./prisma";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "drgaming143@gmail.com",
    pass: "jyzolkwanndisgey",
  },
});

export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  text: string
) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    const data = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendEmailMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => {
  // Attach the sendEmail function to the res object
  res.sendEmail = sendEmail;
  next();
};

// export default sendEmailMiddleware;
