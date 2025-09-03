'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@/components/atoms/Button';
import { Product } from '@/types/product'; // Assuming Product interface is in a types file
interface CTAFormProps {
  product: { _id: string; stock: number };
  heading?: string;
  onSubmit?: (data: { productId: string; name: string; email: string; phone?: string; address: string; quantity: number }) => void;
  theme?: 'light' | 'dark';
  successMessage?: string;
}

export function CTAForm({
  product,
  heading = 'Place Your Order',
  onSubmit = (data) => console.log(data),
  theme,
  successMessage,
}: CTAFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
  });

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
      productId: product._id,
      ...formData,
      quantity: formData.quantity,
    });
    // Reset form
    setFormData({ name: '', email: '', phone: '', address: '', quantity: 1 });
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
          aria-label="Order submission form"
        >
          <Input
            type="hidden"
            name="productId"
            value={product._id}
          />
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
          />
          <Textarea
            label="Address"
            name="address"
            value={formData.address}
            onValueChange={(value) => handleValueChange('address', value)}
            isRequired
            isClearable
            maxLength={500}
            minRows={4}
            variant="bordered"
            color="primary"
            size="md"
            labelPlacement="outside"
            classNames={{
              input: 'font-sans text-body text-text-dark dark:text-text-light',
              inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600',
            }}
          />
          <div className="flex flex-col">
            <label
              htmlFor="quantity"
              className="font-sans text-body text-text-dark dark:text-text-light mb-1"
            >
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md text-text-dark dark:text-text-light"
                aria-label="Decrease quantity"
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
                variant="bordered"
                color="primary"
                size="md"
                labelPlacement="outside"
                classNames={{
                  input: 'font-sans text-body text-text-dark dark:text-text-light text-center',
                  inputWrapper: 'bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600 w-20',
                }}
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md text-text-dark dark:text-text-light"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="bg-primary text-gray-900 hover:bg-primary-dark hover:scale-105 transition-transform"
          >
            Place Order
          </Button>
        </Form>
        {successMessage && (
          <p className="text-body text-green-500 mt-4 text-center">{successMessage}</p>
        )}
      </div>
    </section>
  );
}