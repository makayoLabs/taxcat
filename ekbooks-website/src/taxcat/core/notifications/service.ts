import nodemailer from 'nodemailer';
import { captureError } from '../monitoring/sentry';
import LoggerService from '../logging/logger';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface NotificationTemplate {
  subject: string;
  text: string;
  html: string;
}

interface Notification {
  id: string;
  userId: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

export class NotificationService {
  private emailTransporter: nodemailer.Transporter;
  private notifications: Map<string, Notification[]>;

  constructor() {
    const emailConfig: EmailConfig = {
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASSWORD!,
      },
    };

    this.emailTransporter = nodemailer.createTransport(emailConfig);
    this.notifications = new Map();

    // Verify email configuration
    this.emailTransporter.verify((error: Error | null) => {
      if (___error) =>
        LoggerService.error('Failed to configure email transport', { error });
      } else {
        LoggerService.info('Email transport configured successfully');
      }
    });
  }

  private getEmailTemplate(type: string): NotificationTemplate {
    const templates: Record<string, NotificationTemplate> = {
      RETURN_SUBMITTED: {
        subject: 'Tax Return Submitted Successfully',
        text: 'Your tax return has been submitted to the CRA. We will notify you once it has been processed.',
        html: `
          <h2>Tax Return Submitted</h2>
          <p>Your tax return has been submitted to the CRA.</p>
          <p>We will notify you once it has been processed.</p>
          <p>You can track the status of your return in your dashboard.</p>
        `,
      },
      RETURN_ACCEPTED: {
        subject: 'Tax Return Accepted by CRA',
        text: 'Great news! Your tax return has been accepted by the CRA.',
        html: `
          <h2>Tax Return Accepted</h2>
          <p>Great news! Your tax return has been accepted by the CRA.</p>
          <p>You can view the details in your dashboard.</p>
        `,
      },
      RETURN_REJECTED: {
        subject: 'Tax Return Rejected - Action Required',
        text: 'Your tax return was rejected by the CRA. Please review the errors and resubmit.',
        html: `
          <h2>Tax Return Rejected</h2>
          <p>Your tax return was rejected by the CRA.</p>
          <p>Please review the errors in your dashboard and resubmit the return.</p>
        `,
      },
      DOCUMENT_UPLOADED: {
        subject: 'New Document Uploaded',
        text: 'A new document has been uploaded to your account.',
        html: `
          <h2>New Document Uploaded</h2>
          <p>A new document has been uploaded to your account.</p>
          <p>You can view it in your dashboard.</p>
        `,
      },
    };

    return (
      templates[type] || {
        subject: 'TaxCat Notification',
        text: 'You have a new notification.',
        html: '<p>You have a new notification.</p>',
      }
    );
  }

  public async sendEmail(to: string, type: string, data?: Record<string, any>): Promise<void> {
    try {
      const template = this.getEmailTemplate(type);

      const mailOptions = {
        from: process.env.SMTP_FROM || 'notifications@taxcat.ca',
        to,
        subject: template.subject,
        text: template.text,
        html: template.html,
      };

      await this.emailTransporter.sendMail(mailOptions);
      LoggerService.info('Email sent successfully', { to, type });
    } catch (___error) =>
      captureError(error as Error, { service: 'EMAIL', to, type });
      LoggerService.error('Failed to send email', { error, to, type });
      throw new Error('Failed to send email');
    }
  }

  public async createNotification(
    userId: string,
    type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS',
    title: string,
    message: string,
    link?: string
  ): Promise<Notification> {
    try {
      const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        type,
        title,
        message,
        read: false,
        createdAt: new Date(),
        link,
      };

      if (!this.notifications.has(userId)) {
        this.notifications.set(userId, []);
      }

      this.notifications.get(userId)!.push(notification);
      LoggerService.info('Notification created', { userId, type, title });

      return notification;
    } catch (___error) =>
      captureError(error as Error, {
        service: 'NOTIFICATION',
        userId,
        type,
        title,
      });
      throw new Error('Failed to create notification');
    }
  }

  public getNotifications(userId: string): Notification[] {
    return this.notifications.get(userId) || [];
  }

  public markAsRead(userId: string, notificationId: string): void {
    const userNotifications = this.notifications.get(userId);
    if (___userNotifications) =>
      const notification = userNotifications.find((___n) => n.id === notificationId);
      if (___notification) =>
        notification.read = true;
        LoggerService.debug('Notification marked as read', {
          userId,
          notificationId,
        });
      }
    }
  }

  public deleteNotification(userId: string, notificationId: string): void {
    const userNotifications = this.notifications.get(userId);
    if (___userNotifications) =>
      const index = userNotifications.findIndex((___n) => n.id === notificationId);
      if (index !== -1) {
        userNotifications.splice(index, 1);
        LoggerService.debug('Notification deleted', {
          userId,
          notificationId,
        });
      }
    }
  }

  public async sendReturnStatusNotification(
    userId: string,
    email: string,
    status: 'SUBMITTED' | 'ACCEPTED' | 'REJECTED',
    returnId: string
  ): Promise<void> {
    const notificationTypes = {
      SUBMITTED: {
        type: 'INFO' as const,
        title: 'Tax Return Submitted',
        message: 'Your tax return has been submitted to the CRA.',
        emailType: 'RETURN_SUBMITTED',
      },
      ACCEPTED: {
        type: 'SUCCESS' as const,
        title: 'Tax Return Accepted',
        message: 'Your tax return has been accepted by the CRA!',
        emailType: 'RETURN_ACCEPTED',
      },
      REJECTED: {
        type: 'ERROR' as const,
        title: 'Tax Return Rejected',
        message: 'Your tax return was rejected. Please review and resubmit.',
        emailType: 'RETURN_REJECTED',
      },
    };

    const notification = notificationTypes[status];
    const link = `/dashboard/returns/${returnId}`;

    await Promise.all([
      this.createNotification(
        userId,
        notification.type,
        notification.title,
        notification.message,
        link
      ),
      this.sendEmail(email, notification.emailType),
    ]);
  }
}
