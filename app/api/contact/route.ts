import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const INQUIRY_LABELS: Record<string, string> = {
  general: 'Información general',
  press: 'Prensa',
  support: 'Soporte',
  partnership: 'Colaboración',
  investor: 'Inversor',
  other: 'Otro',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, inquiryType, confidentialityAccepted } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
      inquiryType?: string;
      confidentialityAccepted?: boolean;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const isInvestor = inquiryType === 'investor';

    // Server-side enforcement of the confidentiality gate — never trust
    // client-side validation alone for an investor inquiry.
    if (isInvestor && !confidentialityAccepted) {
      return NextResponse.json({ error: 'Confidentiality acknowledgment required' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const inquiryLabel = INQUIRY_LABELS[inquiryType || 'general'] || 'General';
    const emailSubject = isInvestor
      ? `[INVERSOR - CONFIDENCIAL] ${subject}`
      : `[Contacto Web - ${inquiryLabel}] ${subject}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Omniverse Games <onboarding@resend.dev>',
        to: ['bankaipc@gmail.com'],
        reply_to: email,
        subject: emailSubject,
        html: `
          ${isInvestor ? '<p style="color:#6D28D9;font-weight:bold;">⚠ CONSULTA DE INVERSOR — el remitente confirmó tratamiento confidencial. Responder con prioridad.</p>' : ''}
          <h2>Nuevo mensaje desde omniverse-games.com</h2>
          <p><strong>Tipo de consulta:</strong> ${inquiryLabel}</p>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
