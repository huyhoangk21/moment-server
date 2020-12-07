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
import { Creator } from './Creator';
import { Like } from './Like';

@Entity({
  name: 'snapshots',
  orderBy: {
    created_at: 'DESC',
  },
})
export class Snapshot extends BaseEntity {
  constructor(snapshot: Partial<Snapshot>) {
    super();
    Object.assign(this, snapshot);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  snapshot_id!: number;

  @ManyToOne(() => Creator, creator => creator.snapshots, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'creator_id' })
  creator!: Creator;

  @OneToMany(() => Like, like => like.snapshot)
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
