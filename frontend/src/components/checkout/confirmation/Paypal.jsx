import React, { useRef, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const paypalScriptOptions = {
  "client-id":
    "AbRrEQYIUs4ua0sadcrMCFoJUHF1l5CSUljqd5BYzTKBNqC5TiWgeoN2FF3bl73xdUDBhapnr7JSLts6",
  currency: "SGD",
  intent: "capture",
  // disableFunding: "card",
};

function Button({ handlePayPalPayment }) {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps = {
    style: { layout: "vertical", label: "pay" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "100.00",
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
      {isPending ? <p>Load Smart Payment Button...</p> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}

export default function Paypal({ handlePayPalPayment }) {
  return (
    <div>
      <PayPalScriptProvider options={paypalScriptOptions}>
        <Button
          handlePayPalPayment={handlePayPalPayment}
        />
      </PayPalScriptProvider>
    </div>
  );
}
