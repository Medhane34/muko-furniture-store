// components/features/product/CTAForm.tsx
'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@/components/atoms/Button';
// Import Icons
import { HiPhone } from 'react-icons/hi';
import { FaTelegram } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

interface CTAFormProps {
  product: { sku: string; stock: number };
  heading?: string;
  onSubmit?: (data: { productId: string; name: string; email: string; phone?: string; address: string; quantity: number }) => void;
  theme?: 'light' | 'dark';
  successMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
}

// Define structure for contact methods
interface ContactMethod {
  type: 'phone' | 'telegram' | 'location';
  title: string;
  description: string;
  value: string;
  link: string;
  ctaText: string;
}

export function CTAForm({
  product,
  heading = 'Place Your Order',
  onSubmit = (data) => console.log(data),
  theme,
  successMessage,
  errorMessage,
  isLoading,
}: CTAFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  // Hard-coded contact methods data
  const contactMethods: ContactMethod[] = [
    {
      type: 'phone',
      title: 'Call to Order',
      description: 'Speak directly with our sales team for personal assistance.',
      value: '+251 11 123 4567',
      link: 'tel:+251111234567',
      ctaText: 'Call Now',
    },
    {
      type: 'telegram',
      title: 'Message on Telegram',
      description: 'For fast responses and quick orders.',
      value: '@MukoFurniture',
      link: 'https://t.me/MukoFurniture',
      ctaText: 'Message Us',
    },
    {
      type: 'location',
      title: 'Visit Our Showroom',
      description: 'See and feel the quality in person at our flagship store.',
      value: 'Bole Road, Addis Ababa',
      link: 'https://maps.google.com/?q=Bole+Road,+Addis+Ababa', // Replace with exact link
      ctaText: 'Get Directions',
    },
  ];

  const handleValueChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value as string) || 1 : value,
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setFormData((prev) => {
      const newQty = Math.min(Math.max(prev.quantity + delta, 1), product.stock);
      return { ...prev, quantity: newQty };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId: product.sku,
      ...formData,
      quantity: formData.quantity,
    });
    if (!errorMessage) {
      setFormData({ name: '', email: '', phone: '', address: '', quantity: 1 });
    }
  };

  // Function to render icon based on type
  const renderIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <HiPhone className="w-6 h-6 text-primary" />;
      case 'telegram':
        return <FaTelegram className="w-6 h-6 text-primary" />;
      case 'location':
        return <IoLocationOutline className="w-6 h-6 text-primary" />;
      default:
        return <HiPhone className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <section className={`py-16 lg:py-24 bg-background-light dark:bg-background-dark ${theme ? (theme === 'dark' ? 'dark' : '') : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column 1: Contact Methods */}
          <div className="flex flex-col justify-center">
            <div className="animate-fade-in">
              {/* <h2 className="font-sans text-heading font-bold text-text-light dark:text-text-dark mb-6">
                Other Ways to Order
              </h2> */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-background-dark/10 dark:border-background-light/10 shadow-lg dark:shadow-xl-dark hover:shadow-xl transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {renderIcon(method.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-text-light dark:text-text-dark mb-1">
                          {method.title}
                        </h3>
                        <p className="text-body text-text-light/70 dark:text-text-dark/70 mb-2">
                          {method.description}
                        </p>
                        <p className="text-body font-medium text-text-light dark:text-text-dark mb-3">
                          {method.value}
                        </p>
                        <a
                          href={method.link}
                          target={method.type === 'telegram' ? '_blank' : '_self'}
                          rel={method.type === 'telegram' ? 'noopener noreferrer' : ''}
                          className="inline-flex items-center text-primary font-semibold text-body hover:underline group-hover:underline"
                        >
                          {method.ctaText} →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Order Form */}
          <div className="bg-background-light dark:bg-background-dark p-8 lg:p-10 rounded-3xl shadow-2xl dark:shadow-xl-dark">
            <div className="animate-fade-in">
              <h2 className="font-sans text-heading font-bold text-text-light dark:text-text-dark mb-2">
                {heading}
              </h2>
              <p className="text-body text-text-light/70 dark:text-text-dark/70 mb-8">
                Complete the form below to place your order. We'll contact you to confirm details.
              </p>

              <Form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                validationBehavior="native"
                aria-label="Order submission form"
              >
                <Input
                  type="hidden"
                  name="productId"
                  value={product.sku}
                />
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onValueChange={(value) => handleValueChange('name', value)}
                  isRequired
                  isClearable
                  maxLength={100}
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
                />
                <Textarea
                  label="Delivery Address"
                  name="address"
                  value={formData.address}
                  onValueChange={(value) => handleValueChange('address', value)}
                  isRequired
                  isClearable
                  maxLength={500}
                  minRows={3}
                  variant="underlined"
                  color="primary"
                  size="lg"
                  labelPlacement="outside"
                  placeholder=" "
                  classNames={{
                    input: 'font-sans text-body text-text-light dark:text-text-dark !px-0 resize-none',
                    label: 'text-text-light/70 dark:text-text-dark/70',
                    inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none',
                  }}
                  isDisabled={isLoading}
                />
                
                {/* Quantity Selector - Enhanced */}
                <div className="flex flex-col pt-2">
                  <label className="font-sans text-body text-text-light/70 dark:text-text-dark/70 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center bg-background-dark/5 dark:bg-background-light/10 rounded-lg text-text-light dark:text-text-dark hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                      disabled={isLoading || formData.quantity <= 1}
                    >
                      -
                    </button>
                    <Input
                      type="number"
                      name="quantity"
                      value={formData.quantity.toString()}
                      onValueChange={(value) => handleValueChange('quantity', value)}
                      min={1}
                      max={product.stock}
                      variant="underlined"
                      color="primary"
                      size="lg"
                      labelPlacement="outside"
                      classNames={{
                        input: 'font-sans text-body text-text-light dark:text-text-dark text-center !px-0',
                        inputWrapper: 'data-[hover=true]:bg-transparent px-0 group-data-[focus=true]:bg-transparent border-b-2 border-background-dark/20 dark:border-background-light/20 group-data-[focus=true]:border-primary rounded-none w-20',
                        label: 'text-text-light/70 dark:text-text-dark/70',
                      }}
                      isDisabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center bg-background-dark/5 dark:bg-background-light/10 rounded-lg text-text-light dark:text-text-dark hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                      disabled={isLoading || formData.quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="bg-gradient-to-r from-gradient-from to-gradient-to text-gray-900 font-bold hover:shadow-lg hover:scale-[1.02] transition-all mt-4"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </Form>
              
              {/* Success/Error Messages */}
              {successMessage && (
                <p className="text-body text-green-500 mt-6 text-center">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-body text-red-500 mt-6 text-center">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}