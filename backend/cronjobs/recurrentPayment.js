import cron from "node-cron";
// import { getAllSales } from "../src/controller/saleController.js";
import "dotenv/config";

// function preprocessSales() {
//   //get all sales
//   const sales = getAllSales();

//   const paymentReceivers = new Map();
//   for (const sale in sales) {
//     if (sale.createdAt <= new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)) {
//       if (paymentReceivers.has(sale.user.email)) {
//         paymentReceivers.put(
//           sale.user.email,
//           paymentReceivers.get(sale.user.email) + sale.totalPrice
//         );
//       } else {
//         paymentReceivers.put(sale.user.email, sale.totalPrice);
//       }
//     }
//   }
// return paymentReceivers;
// }

const fetchPayments = async (paymentReceivers) => {
  const items = [];

  for (const [email, amountToPay] of paymentReceivers.entries()) {
    items.push({
      amount: {
        value: amountToPay.toString(), // Convert amount to string
        currency: "SGD",
      },
      note: "Thanks for your patronage!",
      sender_item_id: "201403140001",
      recipient_wallet: "PAYPAL",
      receiver: email,
      notification_language: "en-US",
    });
  }

  const postBody = {
    sender_batch_header: {
      sender_batch_id: "Payouts_" + Date.now(),
      recipient_type: "EMAIL",
      email_subject: "You have a payout!",
      email_message:
        "You have received a payout! Thanks for using our service!",
    },
    items,
  };

  try {
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/payments/payouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.PAYPAL_BEARER_TOKEN,
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    console.log("status code:", response.status);
  } catch (error) {
    console.error("Error fetching payments:", error);
  }
}

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}
// Schedule the cron job to run every minute
// * * 1 * * for first of every month
function monthlyRecurrentPayment() {
  cron.schedule("* * * * *", () => {
    const paymentReceivers = preprocessSales();
    payout(paymentReceivers);
    logMessage();
  });
}

export { monthlyRecurrentPayment };
