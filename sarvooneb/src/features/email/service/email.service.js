/**
 * Email Service
 * Manages email transactional operations and coordinates with the email repository.
 */
export class EmailService {
  /**
   * @param {Object} emailRepository - Instance of EmailRepository
   */
  constructor(emailRepository) {
    this.emailRepository = emailRepository;
  }

  /**
   * Sends an email using Brevo API and records the audit log in the repository.
   */
  async sendEmail({ to, subject, htmlContent, textContent, sender }) {
    const apiKey = process.env.BREVO_API_KEY;
    const defaultSenderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@sarvoone.com';
    const defaultSenderName = process.env.BREVO_SENDER_NAME || 'Sarvo One';

    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not defined in the environment variables.');
    }

    if (!to || (Array.isArray(to) && to.length === 0)) {
      throw new Error('At least one recipient ("to") must be specified.');
    }

    if (!subject) {
      throw new Error('Email "subject" is required.');
    }

    if (!htmlContent) {
      throw new Error('Email "htmlContent" is required.');
    }

    // Format "to" field
    let formattedTo = [];
    if (typeof to === 'string') {
      formattedTo = [{ email: to }];
    } else if (Array.isArray(to)) {
      formattedTo = to.map(recipient => {
        if (typeof recipient === 'string') {
          return { email: recipient };
        } else if (recipient && typeof recipient === 'object' && recipient.email) {
          return recipient;
        } else {
          throw new Error('Invalid recipient format in array. Expected email string or object with "email" property.');
        }
      });
    } else {
      throw new Error('Invalid "to" recipient format. Expected string or array.');
    }

    // Format "sender" field
    const formattedSender = sender && sender.email 
      ? { name: sender.name || defaultSenderName, email: sender.email }
      : { name: defaultSenderName, email: defaultSenderEmail };

    const payload = {
      sender: formattedSender,
      to: formattedTo,
      subject,
      htmlContent,
    };

    if (textContent) {
      payload.textContent = textContent;
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Brevo API Error Response:', data);
        throw new Error(data.message || `Failed to send email. HTTP Status: ${response.status}`);
      }

      // Log success to repository
      await this.emailRepository.logEmail({
        to: JSON.stringify(formattedTo),
        subject,
        status: 'success',
        providerMessageId: data.messageId
      });

      return data;
    } catch (error) {
      // Log failure to repository
      await this.emailRepository.logEmail({
        to: JSON.stringify(formattedTo),
        subject,
        status: 'failed',
        error: error.message
      });

      console.error('Error in sendEmail service:', error.message);
      throw error;
    }
  }
}
