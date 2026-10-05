'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function WhatsAppButton({ waUrl }: { waUrl: string }) {
  const searchParams = useSearchParams();
  const openWa = searchParams.get('openWa');

  useEffect(() => {
    if (openWa === '1') {
      const timer = setTimeout(() => {
        window.location.href = waUrl;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [openWa, waUrl]);

  return (
    <div className="bg-success-subtle border border-success p-3 rounded-4 mb-4 text-center shadow-sm">
      <h6 className="fw-bold text-success mb-2">
        <i className="bi bi-whatsapp me-2 fs-5"></i> Send Order Confirmation to WhatsApp
      </h6>
      <p className="text-secondary small mb-3">
        Click below to send your complete order summary, courier choice & delivery hub details directly to our farm WhatsApp.
      </p>
      <a 
        href={waUrl} 
        target="_blank" 
        rel="noreferrer" 
        className="btn btn-success btn-lg fw-bold w-100 shadow py-3"
      >
        <i className="bi bi-whatsapp me-2"></i> Send Order Details via WhatsApp Now
      </a>
    </div>
  );
}
