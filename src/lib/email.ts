import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? "smtp.gmail.com",
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer | string; contentType?: string }[];
}

export async function sendEmail(opts: SendEmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"${process.env.PDF_COMPANY_NAME ?? "NextGen Tech"}" <${process.env.MAIL_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      attachments: opts.attachments,
    });
    return true;
  } catch (err) {
    console.error("[Email] Send failed:", err);
    return false;
  }
}

/* ── Templates ───────────────────────────────────────────────────── */
export function leadThankYouTemplate(name: string, services: string[]): string {
  const co = process.env.PDF_COMPANY_NAME ?? "NextGen Tech Solution";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #3b82f6, #7c3aed); padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .body { padding: 32px; }
    .body h2 { color: #111; font-size: 20px; }
    .body p { color: #555; line-height: 1.6; }
    .service-list { background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .service-list li { color: #333; margin: 6px 0; }
    .cta { text-align: center; margin: 24px 0; }
    .cta a { background: linear-gradient(135deg, #3b82f6, #7c3aed); color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${co}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Thank You for Your Enquiry</p>
    </div>
    <div class="body">
      <h2>Dear ${name},</h2>
      <p>Thank you for reaching out to <strong>${co}</strong>. We have received your enquiry and our team will get back to you within <strong>24 hours</strong>.</p>
      <p><strong>Services you are interested in:</strong></p>
      <div class="service-list">
        <ul style="margin:0;padding-left:20px;">
          ${services.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <p>Our expert team will analyze your requirements and prepare a detailed proposal for you.</p>
      <div class="cta">
        <a href="${process.env.PDF_COMPANY_WEBSITE ?? "https://nextgentechsolution.org"}">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p>${co} · ${process.env.PDF_COMPANY_EMAIL} · ${process.env.PDF_COMPANY_PHONE}</p>
      <p style="margin-top:8px">${process.env.PDF_COMPANY_ADDRESS}</p>
    </div>
  </div>
</body>
</html>`;
}

export function quotationEmailTemplate(
  clientName: string,
  quotationId: string,
  total: number
): string {
  const co = process.env.PDF_COMPANY_NAME ?? "NextGen Tech Solution";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #3b82f6, #7c3aed); padding: 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 24px; }
  .body { padding: 32px; }
  .amount { font-size: 32px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
  .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>${co}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">Quotation — ${quotationId}</p>
    </div>
    <div class="body">
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>Please find attached your quotation from <strong>${co}</strong>.</p>
      <div class="amount">₹${total.toLocaleString("en-IN")}</div>
      <p>Please review the attached PDF for the complete breakdown of services and pricing.</p>
      <p>This quotation is valid for <strong>30 days</strong>. To proceed, simply reply to this email or contact us at ${process.env.PDF_COMPANY_PHONE}.</p>
    </div>
    <div class="footer">
      <p>${co} · ${process.env.PDF_COMPANY_EMAIL} · ${process.env.PDF_COMPANY_PHONE}</p>
    </div>
  </div>
</body>
</html>`;
}
