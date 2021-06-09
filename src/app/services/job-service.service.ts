import { dependency } from '@foal/core';
import { Connection, In, IsNull, Not } from 'typeorm';

import { Company, Job, Proposal, ProposalStatus, User } from '../entities';

export class JobService {
  @dependency
  connection: Connection;
    
  get repository() {
    return this.connection.getRepository(Job);
  }
  get proposalRepository() {
    return this.connection.getRepository(Proposal);
  }
  get userRepository() {
    return this.connection.getRepository(User);
  }

  async getAll(userId: number, options: Record<string, string>) {
    let jobs: Job[] = [];
    const rejectedCondition = !(!options.rejected || options.rejected === 'false');

    const user = await this.userRepository.findOneOrFail(userId);
    const company = await user.company;

    const proposals = (await this.proposalRepository.find({
      where: { company, status: ProposalStatus.rejected },
      join: {
        alias: 'proposal',
        innerJoinAndSelect: {
          job: 'proposal.job',
        }
      },
      select: ['id', 'job']
    }) as unknown) as { id: number; __job__: Job }[];

    const jobIds = proposals.map(({__job__}) => __job__.id);
    let baseCondition: Record<string, unknown> = rejectedCondition ? { id: In(jobIds) } : { company: IsNull(), id: Not(In(jobIds)) };
    if (!jobIds.length) {
      if (rejectedCondition) return [];
      baseCondition = { company: IsNull() };
    } 
    jobs = await this.repository.find({ where: options.location ? { ...baseCondition, boatLocation: options.location } : baseCondition, order: { dueDate: 'ASC' } });

    const promises: (Promise<User>|User)[] = [];
    for (const job of jobs) {
      promises.push(job.user);
    }
    await Promise.all(promises);

    return jobs;
  }

  async getLocations() {
    return this.repository.createQueryBuilder('job').select('job.boatLocation', 'boatLocation').distinct().getRawMany();
  }

  async accept(id: undefined | number, userId: number) {
    if (!id) throw new Error('Missing id');
    const user = await this.userRepository.findOneOrFail(userId);
    const company = await user.company;
    const job = await this.checkJob(id, company);

    const proposal = this.proposalRepository.create();
    proposal.company = company;
    proposal.job = job;
    proposal.status = ProposalStatus.accepted;
    await this.proposalRepository.save(proposal);
    job.company = company;

    return this.repository.save(job);
  }

  async reject(id: undefined | number, userId: number) {
    if (!id) throw new Error('Missing id');
    const user = await this.userRepository.findOneOrFail(userId);
    const company = await user.company;
    const job = await this.checkJob(id, company);

    const proposal = this.proposalRepository.create();
    proposal.company = company;
    proposal.job = job;
    proposal.status = ProposalStatus.rejected;
    await this.proposalRepository.save(proposal);

    return job;
  }

  async checkJob(id: number, company: Company) {
    const job = await this.repository.findOneOrFail(id);
    const jobCompany = await job.company;
    if (job.isDone || job.dueDate < new Date() || jobCompany) throw new Error('Unavailable job');
    const acceptedJobsByCompany = await company.acceptedJobs;
    if (
      acceptedJobsByCompany &&
      acceptedJobsByCompany.find(({ id }) => id === job.id)
    ) throw new Error('Already accepted job');
    const alreadyProposed = await this.proposalRepository.find({ where: { company, job } });
    if (alreadyProposed.length) throw new Error('Already have a proposal');
    return job;
  }

}
