import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export type Etnia = 'branco' | 'pardo' | 'preto' | 'amarelo' | 'indigena';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: ['branco', 'pardo', 'preto', 'amarelo', 'indigena'],
  })
  ethnicity: Etnia;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
