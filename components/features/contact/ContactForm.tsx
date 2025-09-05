// components/features/contact/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@/components/atoms/Button';

interface ContactFormProps {
  heading?: string;
  onSubmit?: (data: { name: string; email: string; phone?: string; message: string }) => void;
  theme?: 'light' | 'dark';
  isLoading?: boolean;
}

export function ContactForm({
  heading = 'Contact Us',
  onSubmit = (data) => console.log(data),
  theme,
  isLoading,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleValueChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isLoading) {
      // Reset form only if not loading (assumes success)
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section className={`py-12 bg-background-light dark:bg-background-dark ${theme ? (theme === 'dark' ? 'dark' : '') : ''}`}>
      <div className="max-w-lg md:max-w-xl mx-auto p-6 rounded-lg shadow-sm bg-background-light dark:bg-background-dark animate-fade-in">
        <h2 className="font-sans text-heading font-bold text-center text-text-dark dark:text-text-light mb-6 border-b-2 border-primary pb-2">
          {heading}
        </h2>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          validationBehavior="native"
          aria-label="Contact form"
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onValueChange={(value) => handleValueChange('name', value)}
            isRequired
            isClearable
            maxLength={100}
            variant="bordered"
            color="primary"
            size="md"
            labelPlacement="outside"
            classNames={{
              input: 'font-sans text-body text-text-dark dark:text-text-light',
              inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600',
            }}
            isDisabled={isLoading}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onValueChange={(value) => handleValueChange('email', value)}
            isRequired
            isClearable
            variant="bordered"
            color="primary"
            size="md"
            labelPlacement="outside"
            classNames={{
              input: 'font-sans text-body text-text-dark dark:text-text-light',
              inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600',
            }}
            isDisabled={isLoading}
          />
          <Input
            type="tel"
            label="Phone (Optional)"
            name="phone"
            value={formData.phone}
            onValueChange={(value) => handleValueChange('phone', value)}
            isClearable
            variant="bordered"
            color="primary"
            size="md"
            labelPlacement="outside"
            classNames={{
              input: 'font-sans text-body text-text-dark dark:text-text-light',
              inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600',
            }}
            isDisabled={isLoading}
          />
          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onValueChange={(value) => handleValueChange('message', value)}
            isRequired
            isClearable
            maxLength={1000}
            minRows={4}
            variant="bordered"
            color="primary"
            size="md"
            labelPlacement="outside"
            classNames={{
              input: 'font-sans text-body text-text-dark dark:text-text-light',
              inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600',
            }}
            isDisabled={isLoading}
          />
          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="bg-primary text-gray-900 hover:bg-primary-dark hover:scale-105 transition-transform"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Send Message'}
          </Button>
        </Form>
      </div>
    </section>
  );
}