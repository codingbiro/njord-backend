import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Company } from './company.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @Column({ default: true, select: false })
  active: boolean;

  @ManyToOne(() => UserRole, { lazy: true })
  role: Promise<UserRole> | UserRole;

  @ManyToOne(() => Company, { lazy: true })
  company: Promise<Company> | Company;

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }
}
