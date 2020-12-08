import { Exclude, classToPlain } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Moment } from './Moment';

@Entity({ name: 'likes' })
export class Like extends BaseEntity {
  constructor(like: Partial<Like>) {
    super();
    Object.assign(this, like);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  like_id!: number;

  @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Moment, moment => moment.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moment_id' })
  moment!: Moment;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  toJSON() {
    return classToPlain(this);
  }
}
