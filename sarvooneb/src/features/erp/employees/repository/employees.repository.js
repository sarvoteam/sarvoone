import prisma from '../../../../config/prisma.js';

export class EmployeesRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['employee'];
  }

  async create(data) {
    let activeBranchId = data.branchId;
    if (!activeBranchId) {
      const defaultBranch = await this.db.branch.findFirst();
      if (defaultBranch) {
        activeBranchId = defaultBranch.id;
      } else {
        throw new Error("No branch found in the database. Please create a branch first.");
      }
    }

    const { attendanceStatus, clockIn, ...employeeData } = data;
    employeeData.branchId = activeBranchId;
    
    if (employeeData.salary !== undefined) {
      employeeData.salary = Number(employeeData.salary);
    }

    const createdEmployee = await this.model.create({
      data: employeeData
    });

    if (attendanceStatus) {
      let clockInDate = null;
      if (clockIn) {
        try {
          const today = new Date();
          // e.g. "09:00 AM" -> parse to date
          const [time, modifier] = clockIn.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (modifier === 'PM' && hours < 12) hours += 12;
          if (modifier === 'AM' && hours === 12) hours = 0;
          
          clockInDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0, 0);
        } catch (e) {
          console.error("Error parsing clockIn time, setting clockIn to null", e);
        }
      }

      await this.db.attendance.create({
        data: {
          employeeId: createdEmployee.id,
          date: new Date(),
          status: attendanceStatus.toUpperCase(), // PRESENT, ABSENT, LEAVE
          clockIn: clockInDate
        }
      });
    }

    return this.findById(createdEmployee.id);
  }

  async findMany(filters = {}) {
    return this.model.findMany({
      where: filters,
      include: {
        attendance: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id },
      include: {
        attendance: true
      }
    });
  }

  async update(id, data) {
    if (data.salary !== undefined) {
      data.salary = Number(data.salary);
    }

    return this.model.update({
      where: { id },
      data,
      include: {
        attendance: true
      }
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id },
      include: {
        attendance: true
      }
    });
  }
}

