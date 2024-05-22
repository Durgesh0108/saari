// middleware/expiryMiddleware.ts

import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "drgaming143@gmail.com",
    pass: "jyzolkwanndisgey",
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: "drgaming143@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const checkAndSendEmail = async (
  expiryDate: Date,
  email: string,
  user: User
) => {
  const currentDate = new Date();
  const timeDifference = expiryDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const dateDifference = expiryDate.getDate() - currentDate.getDate();
  console.log({ daysDifference, dateDifference });

  if (daysDifference === 5 || daysDifference === 2) {
    const subject = `Reminder: Expiry Date Approaching (${daysDifference} days left)`;
    const text = `Dear user, your subscription is expiring in ${daysDifference} days.`;
    await sendEmail(email, subject, text);
  }

  if (dateDifference === 0 && user.expired === false) {
    if (daysDifference === 0 && user.expired === false) {
      const subject = `Your subscription has expired`;
      const text = `Dear user, your subscription has expired.`;
      await sendEmail(email, subject, text);

      // Update database after expiry
      await prisma.memberSubscription.updateMany({
        where: {
          userId: user.id,
          expired: false,
        },
        data: {
          expired: true,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          expired: true,
        },
      });
    } else {
      const subject = `Reminder: Expiry Date Approaching (${dateDifference} days left)`;
      const text = `Dear user, your subscription is expiring today.`;
      await sendEmail(email, subject, text);
    }
  }
};

const expiryMiddleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Fetch subscriptions from the database
      const users = await prisma.user.findMany({
        include: {
          MemberSubscription: true,
        },
      });

      // Check expiry date and send emails
      for (const user of users) {
        for (const subscription of user.MemberSubscription) {
          const { expiryDate, email } = subscription;
          const expiryDateObj = new Date(expiryDate);
          console.log(`${email} ${expiryDate}`);
          await checkAndSendEmail(expiryDateObj, email, user);
        }
      }

      return handler(req, res);
    } catch (error) {
      console.error("Error in expiryMiddleware:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

export default expiryMiddleware;
