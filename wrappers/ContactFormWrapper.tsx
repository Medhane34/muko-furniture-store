// components/features/contact/ContactFormWrapper.tsx
'use client';

import { useState } from 'react';
import {addToast, ToastProvider} from "@heroui/toast";
import { ContactForm } from '@/components/features/contact/ContactForm';

interface ContactFormWrapperProps {
  heading: string;
}

export function ContactFormWrapper({ heading }: ContactFormWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'contact', ...data }),
      });

      if (response.ok) {
       addToast({
            title: "Success",
            description: "Order submitted successfully!",
            hideIcon: true,

          });
      } else {
        const errorData = await response.json();
         addToast({
            title: "Error",
            description: "Failed to submit!",
            hideIcon: true,
           color: "danger"
          });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      addToast({
            title: "Error",
            description: "Failed to submit!",
            hideIcon: true,
           color: "danger"
          });
    } finally {
      setIsLoading(false);
    }
  };

  return <ContactForm heading={heading} onSubmit={handleSubmit} isLoading={isLoading} />;
}