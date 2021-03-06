import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  BeforeInsert,
  Index,
} from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import bcrypt from 'bcryptjs';
import { Moment } from './Moment';
import { Like } from './Like';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Index()
  @MaxLength(10, {
    message: 'Username must not be more than 10 characters',
  })
  @Column({ unique: true })
  username!: string;

  @Exclude()
  @Index()
  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @Exclude()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Column()
  password!: string;

  @OneToMany(() => Moment, moment => moment.user)
  moments!: Moment[];

  @OneToMany(() => Like, like => like.user)
  likes!: Like[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt: string = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  toJSON(): Record<string, any> {
    return classToPlain(this);
  }

  async matchPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
