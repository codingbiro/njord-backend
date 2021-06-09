import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { Job } from './job.entity';

export enum ProposalStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  canceled = 'canceled',
}

@Entity()
export class Proposal extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  negotiable: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ type: 'text', default: ProposalStatus.pending })
  status: ProposalStatus;

  @ManyToOne(() => Job, { lazy: true })
  job: Promise<Job> | Job;

  @ManyToOne(() => Company, { lazy: true })
  company: Promise<Company> | Company;

}
