import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

export const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "stylizemall@gmail.com",
      pass: "wsvzsqysnastdtqc",
    },
  })
);

export default transporter;
