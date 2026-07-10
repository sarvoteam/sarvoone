import { logAudit } from '../../security/utils/logger.js';

export class BusinessesService {
  constructor(repository, emailService) {
    this.repository = repository;
    this.emailService = emailService;
  }

  async create(data) {
    // Generate a random temporary password
    const generatedPassword = 'pass_' + Math.random().toString(36).substring(2, 10);
    
    // Create the business record in database
    const business = await this.repository.create(data);

    // Create the owner User account if they don't already exist
    if (data.email) {
      const existingUser = await this.repository.db.user.findUnique({
        where: { email: data.email }
      });

      if (!existingUser) {
        // Create the user credentials
        const newUser = await this.repository.db.user.create({
          data: {
            email: data.email,
            name: data.ownerName || 'Business Owner',
            password: generatedPassword
          }
        });

        // Find or create the BUSINESS_OWNER role object
        let roleObj = await this.repository.db.role.findUnique({
          where: { name: 'BUSINESS_OWNER' }
        });
        if (!roleObj) {
          roleObj = await this.repository.db.role.create({
            data: {
              name: 'BUSINESS_OWNER',
              description: 'Business Owner'
            }
          });
        }

        // Map the user to the Business Owner role
        await this.repository.db.userRole.create({
          data: {
            userId: newUser.id,
            roleId: roleObj.id
          }
        });
      }
    }

    // Send onboarding email notification to the business owner
    if (this.emailService && data.email) {
      try {
        const htmlContent = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #7c3aed; margin-top: 0; font-size: 22px; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">Welcome to Sarvo One!</h2>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">Hello <strong>${data.ownerName || 'Business Owner'}</strong>,</p>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">Your business store <strong>${data.name}</strong> has been successfully onboarded to the Sarvo One ERP system.</p>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">Below are your temporary login credentials generated for accessing your dashboard:</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 24px 0; font-family: monospace; font-size: 14.5px; color: #1e293b; line-height: 1.8;">
               <span style="color: #64748b;">Portal Email:</span> <strong>${data.email}</strong><br/>
               <span style="color: #64748b;">Temp Password:</span> <strong>${generatedPassword}</strong>
            </div>

            <p style="font-size: 13.5px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">Please make sure to update your password immediately upon your first login for security purposes.</p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
            <p style="font-size: 11.5px; color: #94a3b8; text-align: center; margin: 0;">This is an automated notification. Please do not reply directly to this mail.</p>
          </div>
        `;

        await this.emailService.sendEmail({
          to: data.email,
          subject: 'Welcome to Sarvo One - Store Onboarding Credentials',
          htmlContent
        });
      } catch (err) {
        console.error('Failed to send onboarding credentials email:', err);
      }
    }

    await logAudit({ action: 'Onboard Storefront', resource: `Onboarded storefront: ${data.name} (${data.ownerName})` });

    return business;
  }

  async getAll(filters) {
    return this.repository.findMany(filters);
  }

  async getById(id) {
    const item = await this.repository.findById(id);
    if (!item) throw new Error(`Record not found in businesses with id: ${id}`);
    return item;
  }

  async update(id, data) {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    const business = await this.repository.delete(id);
    await logAudit({ action: 'Delete Storefront', resource: `Deleted business storefront with ID: ${id}` });
    return business;
  }
}
