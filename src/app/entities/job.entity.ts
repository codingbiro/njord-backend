import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from './company.entity';
import { User } from './user.entity';

@Entity()
export class Job extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isEmergency: boolean;

  @Column({ default: false })
  isDone: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone' })
  dueDate: Date;

  @Column()
  boatType: string;

  @Column()
  boatLocation: string;

  @Column()
  service: string;

  @ManyToOne(() => User, { lazy: true })
  user: Promise<User> | User;

  @ManyToOne(() => Company, { lazy: true, nullable: true })
  company?: Promise<Company> | Company;
 
}
