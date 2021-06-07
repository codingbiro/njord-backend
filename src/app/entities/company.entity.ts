import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Proposal } from './proposal.entity';
import { User } from './user.entity';

@Entity()
export class Company extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, user => user.company, { lazy: true })
  users: Promise<User[]> | User[];

  @OneToMany(() => Proposal, proposal => proposal.company, { lazy: true })
  proposals: Promise<Proposal[]> | Proposal[];

}
