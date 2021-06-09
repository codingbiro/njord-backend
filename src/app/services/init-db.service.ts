import { dependency } from '@foal/core';
import { Connection } from 'typeorm';
import { Company, Job, User, UserRole } from '../entities';

const MS_TO_DAY = 86400000;

export class InitDb {
  @dependency
  connection: Connection;

  get companyRepository() {
    return this.connection.getRepository(Company);
  }
  get jobRepository() {
    return this.connection.getRepository(Job);
  }
  get userRepository() {
    return this.connection.getRepository(User);
  }
  get userRoleRepository() {
    return this.connection.getRepository(UserRole);
  }
  
  async run() {
    const company = await this.createCompany();
    const userRole = await this.createUserRole();
    await this.createUser('Test User', userRole, company);
    const boatUser = await this.createUser('Boat User', userRole);
    await this.createJobs(boatUser);
  }

  createCompany() {
    const company = this.companyRepository.create();
    company.name = 'Test Company';
    return this.companyRepository.save(company);
  }

  createUserRole() {
    const role = this.userRoleRepository.create();
    role.name = 'Test Role';
    return this.userRoleRepository.save(role);
  }
  
  async createUser(name: string, userRole: UserRole, company?: Company) {
    const user = this.userRepository.create();
    user.email = `${name.split(' ')[0].toLowerCase()}@example.com`;
    if (company) user.company = company;
    user.name = name;
    user.role = userRole;
    await user.setPassword('admin');
    return this.userRepository.save(user);
  }

  async createJobs(boatUser: User) {
    const date = new Date();
    const jobs = [
      { user: boatUser, boatType: 'Motor Boat', service: 'Engine Repair', boatLocation: 'Copenhagen', createdAt: date, dueDate: new Date(date.getTime() + MS_TO_DAY), isEmergency: false },
      { user: boatUser, boatType: 'Sail Boat', service: 'Painting', boatLocation: 'Lyngby', createdAt: date, dueDate: new Date(date.getTime() + (MS_TO_DAY * 2)), isEmergency: true },
      { user: boatUser, boatType: 'Motor Boat', service: 'Windshield', boatLocation: 'Lyngby', createdAt: date, dueDate: new Date(date.getTime() + (MS_TO_DAY * 3)), isEmergency: false },
    ];
    for (const job of jobs) {
      await this.jobRepository.save(this.jobRepository.create(job));
    }
  }
}
