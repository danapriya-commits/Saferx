import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Determine if it's the equipment form or general contact form
    const { name, hospital, phone, email, equipment, message, subject } = data;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let mailOptions;

    // Equipment Inquiry Form
    if (equipment) {
      mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.FEEDBACK_EMAIL || 'danapriya@gmail.com',
        replyTo: email,
        subject: `New Equipment Inquiry: ${equipment} from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Equipment Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Hospital/Organization:</strong> ${hospital || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Equipment Required:</strong> ${equipment}</p>
            <h3 style="color: #0f172a; margin-top: 20px;">Message / Specifications:</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message || 'No message provided.'}</div>
          </div>
        `,
      };
    } 
    // General Contact Form
    else {
      mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.FEEDBACK_EMAIL || 'danapriya@gmail.com',
        replyTo: email,
        subject: `New Contact Request: ${subject || 'General Inquiry'} from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <h3 style="color: #0f172a; margin-top: 20px;">Message:</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message || 'No message provided.'}</div>
          </div>
        `,
      };
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
