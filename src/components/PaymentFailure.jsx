import React from "react";

const PaymentFailure = () => {
  return (
    <div>
      <Header />
      <div className="text-green-800 text-5xl font-bold text-center mt-20">
        Your payment has been failed
      </div>
      <div className="flex justify-center items-center mt-10">
        <img
          src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1"
          alt=""
        />
      </div>
    </div>
  );
};

export default PaymentFailure;
