// app/api/submit-form/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@daveyplate/next-rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimit({
    request,
    response: NextResponse.next(),
    sessionLimit: 10, // 10 requests per session
    sessionWindow: 60, // per 60 seconds (1 minute)
    // ipLimit and ipWindow can be added if IP-based limiting is desired
  });

  if (rateLimitResult.status === 429) {
    return NextResponse.json(
      {
        error: 'Too many requests. Please try again later.',
        retryAfter: (rateLimitResult.headers.get('Retry-After') || '60') as string,
      },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const { formType, ...data } = body;

    // Basic validation
    if (!formType || !['order', 'contact'].includes(formType)) {
      return NextResponse.json({ error: 'Invalid or missing formType' }, { status: 400 });
    }

    if (formType === 'order') {
      const { productId, name, email, address, quantity } = data;
      if (!productId || !name || !email || !address || !quantity) {
        return NextResponse.json({ error: 'Missing required fields for order form' }, { status: 400 });
      }
      if (typeof quantity !== 'number' || quantity < 1) {
        return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
      }
    } else {
      const { name, email, message } = data;
      if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields for contact form' }, { status: 400 });
      }
    }

    // Prepare email content
    let emailSubject: string;
    let emailBody: string;

    if (formType === 'order') {
      const { productId, name, email, phone, address, quantity } = data;
      emailSubject = `New Order for Product ID: ${productId}`;
      emailBody = `
        New Order Received:
        Product ID: ${productId}
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Address: ${address}
        Quantity: ${quantity}
      `;
    } else {
      const { name, email, phone, message } = data;
      emailSubject = `New Contact Message from ${name}`;
      emailBody = `
        New Contact Message:
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Message: ${message}
      `;
    }

    // Send email
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'no-reply@yourdomain.com',
      to: process.env.TO_EMAIL || 'recipient@example.com',
      subject: emailSubject,
      text: emailBody,
    });

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}