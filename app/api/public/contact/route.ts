import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const recipient = process.env.FEEDBACK_EMAIL || "danapriya@saferxmedical.com";
    
    const smtpServer = process.env.SMTP_SERVER || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USERNAME;
    const smtpPass = process.env.SMTP_PASSWORD;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: data.email,
        to: recipient,
        subject: `New Feedback: ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.number}\n\nMessage:\n${data.message || ''}`,
      });
    } else {
      console.log(`--- TO ${recipient} ---`);
      console.log(`From: ${data.email}\nSubject: ${data.subject}\n\nName: ${data.name}\nPhone: ${data.number}\n\n${data.message}`);
      console.log("---------------------------------------");
    }

    return NextResponse.json({ status: "success", message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ detail: "Failed to send feedback." }, { status: 500 });
  }
}
