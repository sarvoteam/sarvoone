import prisma from './prisma.js';

export async function ensureDefaultData() {
  console.log('[Seed] Starting database seed verification...');
  try {
    // 1. Ensure Roles exist
    let superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
    if (!superAdminRole) {
      superAdminRole = await prisma.role.create({
        data: { name: 'SUPER_ADMIN', description: 'Super Administrator with full access' }
      });
      console.log('[Seed] Created SUPER_ADMIN role');
    }

    let businessOwnerRole = await prisma.role.findUnique({ where: { name: 'BUSINESS_OWNER' } });
    if (!businessOwnerRole) {
      businessOwnerRole = await prisma.role.create({
        data: { name: 'BUSINESS_OWNER', description: 'Business Owner with administrative access' }
      });
      console.log('[Seed] Created BUSINESS_OWNER role');
    }

    // 2. Ensure Users exist
    let superAdminUser = await prisma.user.findUnique({ where: { email: 'sarvooneteam@gmail.com' } });
    if (!superAdminUser) {
      superAdminUser = await prisma.user.create({
        data: {
          email: 'sarvooneteam@gmail.com',
          password: 'oneadmin2026',
          name: 'Super Admin',
          roles: {
            create: { roleId: superAdminRole.id }
          }
        }
      });
      console.log('[Seed] Created Super Admin user');
    }

    let businessOwnerUser = await prisma.user.findUnique({ where: { email: 'rohit.ghanghav6633@gmail.com' } });
    if (!businessOwnerUser) {
      businessOwnerUser = await prisma.user.create({
        data: {
          email: 'rohit.ghanghav6633@gmail.com',
          password: 'business',
          name: 'Rohit Ghanghav',
          roles: {
            create: { roleId: businessOwnerRole.id }
          }
        }
      });
      console.log('[Seed] Created Business Owner user');
    }

    // 3. Ensure Business exists
    let defaultBusiness = await prisma.business.findFirst();
    if (!defaultBusiness) {
      defaultBusiness = await prisma.business.create({
        data: {
          name: 'Sarvo One Retailers',
          email: 'rohit.ghanghav6633@gmail.com',
          phone: '9876543210',
          address: 'Bandra BKC, Mumbai',
          ownerName: 'Rohit Ghanghav',
          category: 'Retail',
          plan: 'Premium'
        }
      });
      console.log('[Seed] Created default business');
    }

    // 4. Ensure Branch exists
    let defaultBranch = await prisma.branch.findFirst();
    if (!defaultBranch) {
      defaultBranch = await prisma.branch.create({
        data: {
          businessId: defaultBusiness.id,
          name: 'Central Warehouse',
          address: 'Bandra Kurla Complex, Mumbai',
          phone: '022-88229900'
        }
      });
      console.log('[Seed] Created default branch');
    }

    // 5. Ensure Categories exist
    const categoriesList = ['Medical', 'Electronics', 'Hardware'];
    const categoryMap = {};
    for (const catName of categoriesList) {
      let cat = await prisma.category.findFirst({
        where: { name: catName, branchId: defaultBranch.id }
      });
      if (!cat) {
        cat = await prisma.category.create({
          data: { name: catName, branchId: defaultBranch.id }
        });
        console.log(`[Seed] Created category: ${catName}`);
      }
      categoryMap[catName] = cat.id;
    }

    // 6. Ensure Units exist
    const unitsList = [
      { name: 'box', shortName: 'box' },
      { name: 'bottle', shortName: 'btl' },
      { name: 'piece', shortName: 'pc' }
    ];
    const unitMap = {};
    for (const unitItem of unitsList) {
      let unit = await prisma.unit.findFirst({
        where: { name: unitItem.name, branchId: defaultBranch.id }
      });
      if (!unit) {
        unit = await prisma.unit.create({
          data: { name: unitItem.name, shortName: unitItem.shortName, branchId: defaultBranch.id }
        });
        console.log(`[Seed] Created unit: ${unitItem.name}`);
      }
      unitMap[unitItem.name] = unit.id;
    }

    // 7. Ensure default products exist
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      await prisma.product.createMany({
        data: [
          {
            branchId: defaultBranch.id,
            categoryId: categoryMap['Medical'],
            unitId: unitMap['box'],
            name: 'Paracetamol 500mg',
            sku: 'MED-PC-500',
            currentStock: 120,
            reorderLevel: 20,
            purchasePrice: 24,
            sellingPrice: 30,
            batchNumber: 'BAT-10029',
            expiryDate: '2027-10-15',
            damagedStock: 0,
            warehouseStock: 'Central Warehouse'
          },
          {
            branchId: defaultBranch.id,
            categoryId: categoryMap['Medical'],
            unitId: unitMap['bottle'],
            name: 'Amoxicillin 250mg',
            sku: 'MED-AMX-250',
            currentStock: 5,
            reorderLevel: 15,
            purchasePrice: 70,
            sellingPrice: 85,
            batchNumber: 'BAT-99301',
            expiryDate: '2026-09-02',
            damagedStock: 2,
            warehouseStock: 'Central Warehouse'
          },
          {
            branchId: defaultBranch.id,
            categoryId: categoryMap['Electronics'],
            unitId: unitMap['piece'],
            name: 'Wireless Optical Mouse',
            sku: 'ELE-WM-04',
            currentStock: 45,
            reorderLevel: 10,
            purchasePrice: 650,
            sellingPrice: 850,
            batchNumber: 'BAT-ELE-04',
            expiryDate: '',
            damagedStock: 0,
            warehouseStock: 'City Retail Depot'
          },
          {
            branchId: defaultBranch.id,
            categoryId: categoryMap['Hardware'],
            unitId: unitMap['piece'],
            name: 'LED Bulb 9W Premium',
            sku: 'HDW-LED-9W',
            currentStock: 0,
            reorderLevel: 15,
            purchasePrice: 90,
            sellingPrice: 120,
            batchNumber: 'BAT-HDW-9W',
            expiryDate: '',
            damagedStock: 0,
            warehouseStock: 'City Retail Depot'
          }
        ]
      });
      console.log('[Seed] Seeded default products successfully!');
    } else {
      console.log(`[Seed] Database already contains ${productCount} products. Skipping product seed.`);
    }

  } catch (err) {
    console.error('[Seed] Database seeding error:', err);
  }
}
