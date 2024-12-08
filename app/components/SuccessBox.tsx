'use client';

import React from 'react';

interface SuccessBoxProps {
  username: string;
}

export default function SuccessBox({ username }: SuccessBoxProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-green-50 rounded-xl p-8 text-center animate-fade-in">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
        <p className="text-green-600">Thanks for supporting {username} with pizza!</p>
        <p className="text-sm text-green-500 mt-2">Redirecting you back...</p>
      </div>
    </div>
  );
}
