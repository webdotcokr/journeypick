'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExperiencesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /products since this is the new experiences page
    router.replace('/products');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-warm-gray">Redirecting to experiences...</p>
      </div>
    </div>
  );
}