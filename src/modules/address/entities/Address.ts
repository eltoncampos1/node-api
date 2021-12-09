import { User } from 'modules/users/entities/User';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('address')
class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement?: string;

  @Column()
  zip_code: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => User, user => user.address, { onDelete: 'CASCADE' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Address };
