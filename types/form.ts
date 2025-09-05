// types/form.ts
export interface OrderFormData {
  formType: 'order';
  sku: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  quantity: number;
}

export interface ContactFormData {
  formType: 'contact';
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type FormData = OrderFormData | ContactFormData;