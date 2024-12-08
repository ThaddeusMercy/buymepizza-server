'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentWidget from '@requestnetwork/payment-widget/react';
import JSConfetti from 'js-confetti';
import { toast, Toaster } from 'sonner';
import Image from 'next/image';
import SuccessBox from './SuccessBox';

interface PaymentData {
  user: {
    images: {
      profileImage: string;
      bannerImage: string;
    };
    name: string;
    address: string;
    socials: {
      twitter: string;
      instagram: string;
      github: string;
      linkedin: string;
      website: string;
    };
    bio: string;
    username: string;
  };
  amount: number;
  name: string;
  message: string;
  timestamp: string;
}

export default function PaymentContent() {
  const pizzaEmojis = ['🍕', '🍕', '🍕', '🍕', '🍕', '🍕'];
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handlePaymentSuccess = () => {
    jsConfetti?.addConfetti({ emojis: pizzaEmojis });
    setIsSuccess(true);
    setTimeout(() => {
      if (paymentData?.user.username) {
        window.location.href = `https://buymepizza.xyz/${paymentData.user.username}`;
      }
    }, 4000);
  };

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setPaymentData(decoded);
      } catch (e) {
        console.error('Failed to parse payment data:', e);
      }
    }
  }, [searchParams]);

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="text-3xl text-orange-500 flex items-center gap-2"
          style={{
            transform: `translate(calc(${0}px - 50%), calc(${0}px - 50%))`,
            transition: 'transform 0.1s ease-out',
          }}
          onMouseMove={(e) => {
            const target = e.currentTarget;
            target.dataset.mouseX = e.clientX.toString();
            target.dataset.mouseY = e.clientY.toString();
          }}
        >
          <span className="inline-block animate-spin">🍕</span>
        </div>
      </div>
    );
  }

  if (isSuccess && paymentData) {
    return <SuccessBox username={paymentData.user.username} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Header */}
        <div className="bg-orange-500 p-6 text-white">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {paymentData.user.images.profileImage ? (
                <Image
                  src={paymentData.user.images.profileImage}
                  alt={paymentData.user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍕</span>
                </div>
              )}
              <div>
                <h1 className="text-xl font-semibold">{paymentData.user.name}</h1>
                <p className="text-sm text-orange-100">@{paymentData.user.username}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6">
          {/* Message Display */}
          {paymentData.message && (
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 italic">&quot;{paymentData.message}&quot;</p>
              <p className="text-sm text-gray-500 mt-2">- {paymentData.name}</p>
            </div>
          )}

          {/* Amount Display */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${paymentData.amount.toFixed(2)}
            </div>
            <p className="text-gray-500">Support {paymentData.user.name} with pizza!</p>
          </div>

          {/* Payment Widget */}
          <div className="bg-gray-50 rounded-xl p-6">
            <PaymentWidget
              sellerInfo={{
                logo: "/pizza_logo.png",
                name: paymentData.user.name,
              }}
              productInfo={{
                name: "Pizza Support",
                description: paymentData.message || "Have a slice of Pizza on me",
                image: "/pizza_logo.png",
              }}
              amountInUSD={paymentData.amount}
              sellerAddress={paymentData.user.address}
              supportedCurrencies={["ETH-mainnet", "ETH-sepolia-sepolia"]}
              persistRequest={true}
              onPaymentSuccess={handlePaymentSuccess}
              onError={(error) => {
                // show error toast
                toast.error("Your slice of pizza didn't go through, please try again");
                console.error("Payment failed:", error);
              }}
            />
          </div>

          {/* Social Links */}
          {paymentData.user.socials.twitter && (
            <div className="mt-6 text-center">
              <a
                href={paymentData.user.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500"
              >
                Follow {paymentData.user.name} on Twitter
              </a>
            </div>
          )}

          {/* Bio */}
          {paymentData.user.bio && (
            <div className="mt-4 text-center text-sm text-gray-600">
              {paymentData.user.bio}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-center text-sm text-gray-500">
            Powered by BuyMePizza
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
