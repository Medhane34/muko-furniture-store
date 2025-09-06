// components/features/contact/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@/components/atoms/Button';
import Image from 'next/image'; // Import Next.js Image component

interface ContactFormProps {
  heading?: string;
  onSubmit?: (data: { name: string; email: string; phone?: string; message: string }) => void;
  theme?: 'light' | 'dark';
  isLoading?: boolean;
}

export function ContactForm({
  heading = 'Get in Touch',
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
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  // Placeholder for image path - REPLACE WITH YOUR ACTUAL IMAGE PATH
  const formImage = '/homepage-hero.jpg';

  return (
    <section className={`py-16 lg:py-24 bg-background-light dark:bg-background-dark ${theme ? (theme === 'dark' ? 'dark' : '') : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 rounded-3xl overflow-hidden shadow-2xl dark:shadow-xl-dark">
          
          {/* Column 1: Image & Content */}
          <div className="relative hidden lg:block">
            <Image
              src={formImage}
              alt="Muko Furniture - Beautiful modern living room setup"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay with Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent flex items-end p-8">
              <div className="text-background-light">
                <h3 className="text-subheading font-bold mb-2">Experience the Quality</h3>
                <p className="text-body">
                  Have a question about our handcrafted furniture? Our team is here to help you create your dream space.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="bg-background-light dark:bg-background-dark p-8 lg:p-12 flex flex-col justify-center">
            <div className="animate-fade-in">
              <h2 className="font-sans text-heading font-bold text-text-light dark:text-text-dark mb-2">
                {heading}
              </h2>
              <p className="text-body text-text-light/70 dark:text-text-dark/70 mb-8">
                Send us a message and we&apos;ll respond as soon as possible.
              </p>

              <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6" // Increased gap for better spacing
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
                  variant="underlined" // Changed to underlined for cleaner look
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  placeholder=" " // Needed for underlined variant to work well
                  classNames={{
                    input: 'font-sans text-body text-text-light dark:text-text-dark !px-0',
                    label: 'text-text-light/70 dark:text-text-dark/70',
                    inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none', // Removed background and border, added bottom border
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
                  variant="underlined"
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  placeholder=" "
                  classNames={{
                    input: 'font-sans text-body text-text-light dark:text-text-dark !px-0',
                    label: 'text-text-light/70 dark:text-text-dark/70',
                    inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none',
                  }}
                  isDisabled={isLoading}
                />
                <Input
                  isRequired
                  type="tel"
                  label="Phone (Optional)"
                  name="phone"
                  value={formData.phone}
                  onValueChange={(value) => handleValueChange('phone', value)}
                  isClearable
                  variant="underlined"
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  placeholder=" "
                  classNames={{
                    input: 'font-sans text-body text-text-light dark:text-text-dark !px-0',
                    label: 'text-text-light/70 dark:text-text-dark/70',
                    inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none',
                  }}
                  isDisabled={isLoading}
                  validate={(value) => {
                    if (value.length < 10) {
                      return "Phone Number must be at least 10 digits long";
                    }

                    return value === "admin" ? "Nice try!" : null;
                  }}
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
                  variant="underlined"
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  placeholder=" "
                  classNames={{
                    input: 'font-sans text-body text-text-light dark:text-text-dark !px-0 resize-none', // Removed resize handle
                    label: 'text-text-light/70 dark:text-text-dark/70',
                    inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none', 
                  }}
                  isDisabled={isLoading}
                />
                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="bg-gradient-to-r from-gradient-from to-gradient-to text-gray-900 font-bold hover:shadow-lg hover:scale-[1.02] transition-all mt-4" // Added gradient and hover effects
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}