import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from './company.entity';
import { User } from './user.entity';

@Entity()
export class Job extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isEmergency: boolean;

  @Column()
  createdAt: Date;

  @Column()
  dueDate: Date;

  @Column()
  boatType: string;

  @Column()
  boatLocation: string;

  @Column()
  service: string;

  @ManyToOne(() => User, { lazy: true })
  user: Promise<User> | User;

  @ManyToOne(() => Company, { lazy: true })
  company: Promise<Company> | Company;
    
}
