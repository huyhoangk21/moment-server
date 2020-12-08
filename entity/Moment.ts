import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { User } from './User';
import { Like } from './Like';

@Entity({
  name: 'moments',
  orderBy: {
    created_at: 'DESC',
  },
})
export class Moment extends BaseEntity {
  constructor(moment: Partial<Moment>) {
    super();
    Object.assign(this, moment);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  moment_id!: number;

  @ManyToOne(() => User, user => user.moments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Like, like => like.moment)
  likes!: Like[];

  @Column()
  selected_file!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  toJSON() {
    return classToPlain(this);
  }
}
