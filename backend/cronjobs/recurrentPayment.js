import cron from "node-cron";

function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}
// Schedule the cron job to run every minute
function monthlyRecurrentPayment() {
  cron.schedule("* * * * *", () => {
    logMessage();
  });
}

export { monthlyRecurrentPayment };