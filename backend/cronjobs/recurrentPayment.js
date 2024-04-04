import cron from "node-cron";
import { getAllSales } from "../src/controller/saleController.js";
import "dotenv/config";
import { Sale } from "../src/model/saleModel.js";

async function preprocessSales() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const newDate = new Date(year, month, 1);
  const firstDayOfPreviousMonth = new Date(
    newDate.getTime() + 1000 * 60 * 60 * 24
  );

  const paymentReceivers = new Map();

  //get all sales
  try {
    const sales = await Sale.find().populate("user");
    for (let i = 0; i < sales.length; i++) {
      if (sales[i].createdAt >= firstDayOfPreviousMonth) {
        if (paymentReceivers.has(sales[i].user.email)) {
          paymentReceivers.set(
            sales[i].user.email,
            paymentReceivers.get(sales[i].user.email) + sales[i].totalPrice
          );
        } else {
          paymentReceivers.set(sales[i].user.email, sales[i].totalPrice);
        }
      }
    }
    return paymentReceivers;
  } catch (err) {
    console.log(err);
  }
}

const fetchPayments = async (paymentReceivers) => {
  const items = [];
  let uniqueId = 1;
//   console.log(paymentReceivers);
  for (const [email, amountToPay] of paymentReceivers.entries()) {
    // console.log(amountToPay.toFixed(2).toString());
    items.push({
      amount: {
        value: amountToPay.toFixed(2).toString(), // Convert amount to string
        currency: "SGD",
      },
      note: "Thanks for your patronage!",
      sender_item_id: "201403140001" + uniqueId++,
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

  console.log(JSON.stringify(postBody));

//   console.log(postBody.items[0].receiver + " " + postBody.items[0].amount.value);
//   console.log(postBody.items[1].receiver + " " + postBody.items[1].amount.value);

    try {
      const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/payments/payouts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.PAYPAL_BEARER_TOKEN,
          },
          body: JSON.stringify(postBody),
        }
      );
      console.log(response);
      console.log("status code:", response.status);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
};

function logMessage() {
  console.log("Monthly Recurrent Payment Cron job executed at:", new Date().toLocaleString());
}
// Schedule the cron job to run every minute
// * * 1 * * for first of every month
function monthlyRecurrentPayment() {
  cron.schedule("* * 1 * *", async () => {
    const paymentReceivers = await preprocessSales();
    fetchPayments(paymentReceivers);
    logMessage();
  });
}

export { monthlyRecurrentPayment };
