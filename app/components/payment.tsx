"use client"

import PaymentWidget from "@requestnetwork/payment-widget/react";
import { useState } from "react";

export default function PaymentPage() {
    const [state, setState] = useState(false)
    const  handleButton = () => {
        setState(!state)
      }

  return (
    <>

    <button onClick={handleButton}>Show payment</button>

    { state &&
    <PaymentWidget
      sellerInfo={{
        logo: "https://example.com/logo.png",
        name: "Example Store",
      }}
      productInfo={{
        name: "Digital Art Collection",
        description: "A curated collection of digital artworks.",
        image: "https://example.com/product-image.jpg",
      }}
      amountInUSD={1.5}
      sellerAddress="0x1234567890123456789012345678901234567890"
      supportedCurrencies={["ETH-sepolia-sepolia"]}
      persistRequest={true}
      onPaymentSuccess={(request) => {
        console.log(request);
      }}
      onError={(error) => {
        console.error(error);
      }}
    /> }
        </>
  );
}