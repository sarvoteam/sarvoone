/**
 * Email Controller
 * Handles HTTP requests and maps them to the email service.
 */
export class EmailController {
  /**
   * @param {Object} emailService - Instance of EmailService
   */
  constructor(emailService) {
    this.emailService = emailService;
  }

  /**
   * Send custom email
   */
  sendEmail = async (req, res, next) => {
    const { to, subject, htmlContent, textContent, sender } = req.body;

    if (!to || !subject || !htmlContent) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, subject, and htmlContent are required.'
      });
    }

    try {
      const result = await this.emailService.sendEmail({ to, subject, htmlContent, textContent, sender });
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully via Brevo',
        data: result
      });
    } catch (error) {
      // Pass error to global Express error handler
      next(error);
    }
  };

  /**
   * Send beautiful test email
   */
  sendTestEmail = async (req, res, next) => {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email ("to") is required to send a test email.'
      });
    }

    const testSubject = 'Welcome to Sarvo One - Restructured Architecture Success!';
    const testHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Sarvo One</title>
        <style>
          body {
            font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            color: #1f2937;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          }
          .header {
            background: linear-gradient(135deg, #090d16 0%, #151d30 100%);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .header p {
            margin: 8px 0 0 0;
            font-size: 14px;
            color: #94a3b8;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .content {
            padding: 40px 30px;
            line-height: 1.6;
          }
          .badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            padding: 6px 12px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .details-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
          }
          .details-box table {
            width: 100%;
            border-collapse: collapse;
          }
          .details-box td {
            padding: 6px 0;
            font-size: 14px;
          }
          .details-box td.label {
            color: #64748b;
            font-weight: 500;
            width: 30%;
          }
          .details-box td.value {
            color: #0f172a;
            font-weight: 600;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
            color: #ffffff !important;
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px 30px;
            text-align: center;
            font-size: 13px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sarvo One</h1>
            <p>Domain-Driven Architecture</p>
          </div>
          <div class="content">
            <span class="badge">Architecture Verified</span>
            <h2>Hello,</h2>
            <p>Your Sarvo One backend has been successfully restructured to a scalable, <strong>feature/domain-based architecture</strong>!</p>
            
            <div class="details-box">
              <table>
                <tr>
                  <td class="label">Structure</td>
                  <td class="value">Feature/Domain-Based (src/features/)</td>
                </tr>
                <tr>
                  <td class="label">Feature Module</td>
                  <td class="value">features/email/</td>
                </tr>
                <tr>
                  <td class="label">Pattern</td>
                  <td class="value">Controller -> Service -> Repository</td>
                </tr>
                <tr>
                  <td class="label">Language</td>
                  <td class="value">JavaScript (ESM)</td>
                </tr>
              </table>
            </div>

            <p>This layout aligns perfectly with your frontend modules, making development, testing, and expansion much cleaner.</p>
            
            <div style="text-align: center;">
              <a href="https://sarvoone.com" class="button">Go to Dashboard</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Sarvo One. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const result = await this.emailService.sendEmail({
        to,
        subject: testSubject,
        htmlContent: testHtml,
        textContent: 'Your newly restructured backend with feature-based architecture works successfully!'
      });

      return res.status(200).json({
        success: true,
        message: 'Restructured test email dispatched successfully.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}
