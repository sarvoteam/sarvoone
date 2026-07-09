import express from 'express';

/**
 * Creates and configures the Express router for the email feature.
 * 
 * @param {Object} emailController - Instance of EmailController
 * @returns {express.Router}
 */
export function createEmailRouter(emailController) {
  const router = express.Router();

  // Send custom transactional email
  router.post('/send', emailController.sendEmail);

  // Send beautiful test confirmation email
  router.post('/send-test', emailController.sendTestEmail);

  return router;
}
