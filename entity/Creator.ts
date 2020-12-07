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
import { Snapshot } from './Snapshot';
import { Like } from './Like';

@Entity({ name: 'creators' })
export class Creator extends BaseEntity {
  constructor(creator: Partial<Creator>) {
    super();
    Object.assign(this, creator);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  creator_id!: number;

  @Index()
  @MaxLength(20, {
    message: 'Creator name must not be more than 20 characters',
  })
  @Column({ unique: true })
  creator_name!: string;

  @Exclude()
  @Index()
  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @Exclude()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Column()
  password!: string;

  @OneToMany(() => Snapshot, snapshot => snapshot.creator)
  snapshots!: Snapshot[];

  @OneToMany(() => Like, like => like.creator)
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
