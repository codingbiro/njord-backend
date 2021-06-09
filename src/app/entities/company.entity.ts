import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Job } from './job.entity';
import { User } from './user.entity';

@Entity()
export class Company extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.company, { lazy: true })
  users: Promise<User[]> | User[];

  @OneToMany(() => Job, job => job.company, { lazy: true, nullable: true })
  acceptedJobs?: Promise<Job[]> | Job[];

}
