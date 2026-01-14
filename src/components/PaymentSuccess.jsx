import React from "react";
import Header from "./Header";

const PaymentSuccess = () => {
  return (
    <div>
      <Header />
      <div className="text-green-800 text-5xl text-center mt-20 font-bold">
        Your payment has been success
      </div>
      <div className="flex justify-center items-center mt-10">
        <img
          src="https://www.cntraveller.in/wp-content/themes/cntraveller/images/check-circle.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
