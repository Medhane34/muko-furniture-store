// components/features/product/CTAFormWrapper.tsx
'use client';


import { CTAForm } from '@/components/features/product/CTAForm';
import { Product } from '@/types/product';

interface CTAFormWrapperProps {
  product: Product;
  heading: string;
}

export function CTAFormWrapper({ product, heading }: CTAFormWrapperProps) {
  const handleSubmit = async (data: any) => {
    console.log('Form submission:', { product: product.name, data }); // Debug: Log submission
    // Optionally, send to an API route
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, ...data }),
      });
      if (response.ok) {
        console.log('Order submitted successfully');
      } else {
        console.error('Order submission failed');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return <CTAForm product={product} onSubmit={handleSubmit} heading={heading} />;
}