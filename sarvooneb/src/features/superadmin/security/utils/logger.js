import prisma from '../../../../config/prisma.js';

export async function logAudit({ user = 'Emily Lynch (Super Admin)', action, resource, ip = '103.45.201.88' }) {
  try {
    await prisma.auditLog.create({
      data: {
        user,
        action,
        resource,
        ip
      }
    });
  } catch (err) {
    console.error('Failed to write audit log to database:', err);
  }
}

export async function logLogin({ email, ip = '103.45.201.88', agent = 'Chrome 125 / Win11', status }) {
  try {
    await prisma.loginHistory.create({
      data: {
        email,
        ip,
        agent,
        status
      }
    });
  } catch (err) {
    console.error('Failed to write login history to database:', err);
  }
}
