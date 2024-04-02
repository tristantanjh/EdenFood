import "dotenv/config";
import mg from "mailgun-js";

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const sendEmail = async (req, res) => {
  const {
    userEmail,
    subject,
    message,
    amount,
    groceries,
    _id,
    pickupLocation,
    createdAt,
    status,
  } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: `${userEmail}`,
        to: "poopoojoshua@gmail.com",
        subject: `${subject}`,
        html: `
        <h2>Order Details (ID: ${_id})</h2>
        <p><b>Order Created at:</b> ${createdAt}</p>
        <p><b>Status:</b> ${status}</p>
        <p><b>Amount:</b> ${amount}</p>
        <p><b>Pickup Location:</b> ${pickupLocation}</p>

        <h3>Grocery List</h3>
        <ul>
            ${groceries.map((grocery) => `<li>${grocery.grocery.name} (Grocery ID: ${grocery.grocery._id})</li>`).join("")}
        </ul>

        <h3><b>Customer's comment:</b></h3>
        <p>${message}</p>

        <p>Reported by ${userEmail} as of ${`${new Date().getDate()}-${(new Date().getMonth() + 1)}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</p>
        `,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: "Error in sending email" });
        } else {
          console.log(body);
          res.send({ message: "Email sent successfully" });
        }
      }
    );
};

export { sendEmail };
