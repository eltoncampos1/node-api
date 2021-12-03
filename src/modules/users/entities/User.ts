import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

type Etnia = 'branco' | 'pardo' | 'preto' | 'amarelo' | 'indigena';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

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
  etnia: Etnia;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
