import { dependency } from '@foal/core';
import { Connection } from 'typeorm';
import { Company, Proposal, User, UserRole } from '../entities';

export class InitDb {
  @dependency
  connection: Connection;

  get companyRepository() {
    return this.connection.getRepository(Company);
  }
  get proposalRepository() {
    return this.connection.getRepository(Proposal);
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
    await this.createUser(company, userRole);
    await this.createProposal(company);
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
  
  async createUser(company: Company, userRole: UserRole) {
    const user = this.userRepository.create();
    user.email = 'test@example.com';
    user.company = company;
    user.name = 'Test User';
    user.role = userRole;
    await user.setPassword('admin');
    return this.userRepository.save(user);
  }

  createProposal(company: Company) {
    const proposal = this.proposalRepository.create();
    proposal.title = 'Test Proposal';
    proposal.company = company;
    return this.proposalRepository.save(proposal);
  }
}
