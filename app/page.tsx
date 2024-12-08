'use client';

import React, { Suspense } from 'react';
import PaymentContent from './components/PaymentContent';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
          <PaymentContent />
        </Suspense>
      <Toaster />
    </div>
  );
}
