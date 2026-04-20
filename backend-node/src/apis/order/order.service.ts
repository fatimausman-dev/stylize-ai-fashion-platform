import { transporter } from "@/services";

export const sendConfirmationEmail = async (email: string) => {
    console.log("Sending confirmation email to: ", email);
  const res = await transporter.sendMail({
    from: `Stylize <stylizemall@gmail.com>`,
    to: email,
    subject: "Order Confirmation",
    html: `<p>Your order has been confirmed!</p>`,
  });
  console.log("Email sent: ", res);
};
