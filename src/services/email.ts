import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'nextcloud-aio-mailserver',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'admin@ekbooks.ca',
        pass: process.env.SMTP_PASSWORD || process.env.NEXTCLOUD_MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates from Nextcloud
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: options.from || process.env.BUSINESS_EMAIL || 'admin@ekbooks.ca',
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendContactFormEmail(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A9E52;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          This email was sent from the EKBooks.ca contact form.
        </p>
      </div>
    `;

    await this.sendEmail({
      to: process.env.BUSINESS_EMAIL || 'admin@ekbooks.ca',
      subject: `New Contact Form Submission from ${data.name}`,
      html,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1A9E52;">Welcome to EKBooks!</h1>
          <p style="color: #0B2847; font-size: 18px;">Your trusted accounting partner</p>
        </div>

        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0B2847;">Hi ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for choosing EKBooks for your accounting and bookkeeping needs.
            We're excited to help you manage your finances with our professional services.
          </p>

          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #1A9E52; margin-top: 0;">What happens next?</h3>
            <ul style="padding-left: 20px;">
              <li>We'll review your inquiry and get back to you within 24 hours</li>
              <li>Schedule a free consultation to discuss your needs</li>
              <li>Get started with our comprehensive tax and accounting services</li>
            </ul>
          </div>

          <p style="font-size: 16px;">
            If you have any immediate questions, feel free to reply to this email or call us at (555) 123-4567.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            EKBooks.ca - Professional Accounting & Bookkeeping Services<br>
            Email: admin@ekbooks.ca | Phone: (555) 123-4567
          </p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Welcome to EKBooks - Your Accounting Partner',
      html,
    });
  }

  async sendTaxReturnNotification(email: string, taxReturnId: string, status: string): Promise<void> {
    const statusMessages = {
      DRAFT: 'Your tax return has been saved as a draft.',
      IN_PROGRESS: 'We have started processing your tax return.',
      REVIEW: 'Your tax return is under review.',
      COMPLETED: 'Your tax return has been completed and is ready for filing.',
      NETFILED: 'Your tax return has been successfully filed with the CRA.',
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1A9E52;">Tax Return Update</h1>
        </div>

        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0B2847;">Status Update for Tax Return #${taxReturnId}</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            ${statusMessages[status as keyof typeof statusMessages] || 'Your tax return status has been updated.'}
          </p>

          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p><strong>Status:</strong> ${status.replace(/_/g, ' ')}</p>
            <p><strong>Tax Return ID:</strong> ${taxReturnId}</p>
            <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p style="font-size: 16px;">
            You can view the details of your tax return by logging into your TaxCat account.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;">
            TaxCat by EKBooks.ca - Professional Tax Filing Services<br>
            Email: admin@ekbooks.ca | Phone: (555) 123-4567
          </p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: `Tax Return Update - ${status.replace(/_/g, ' ')}`,
      html,
    });
  }
}

export const emailService = new EmailService();
export default emailService;