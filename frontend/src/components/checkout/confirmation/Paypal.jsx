import React, { useRef, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const paypalScriptOptions = {
  "client-id":
    paypalClientId,
  currency: "SGD",
  intent: "capture",
  // disableFunding: "card",
};

function Button({ handlePayPalPayment, totalPrice }) {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  let paymentAmount = "" + totalPrice;
  console.log(paymentAmount);
  console.log(typeof paymentAmount);
  const paypalbuttonTransactionProps = {
    style: { layout: "vertical", label: "pay" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: paymentAmount,
            },
          },
        ],
      });
    },
    onApprove(data, actions) {
      /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
      return actions.order.capture({}).then((details) => {
        //   alert(
        //     "Transaction completed by" +
        //       (details?.payer.name.given_name ?? "No details")
        //   );
        handlePayPalPayment();

        //   alert("Data details: " + JSON.stringify(data, null, 2));
      });
    },

    onError(err) {
      console.log(err);
    },
  };
  return (
    <>
      {isPending && totalPrice ? <p>Load Smart Payment Button...</p> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}

export default function Paypal({ handlePayPalPayment, totalPrice }) {
  return (
    <div>
      {totalPrice ? ( 
        <PayPalScriptProvider options={paypalScriptOptions}>
          <Button
            handlePayPalPayment={handlePayPalPayment}
            totalPrice={totalPrice}
          />
        </PayPalScriptProvider>
      ) : (
        <div>Loading payment...</div>
      )}
    </div>
  );
}
