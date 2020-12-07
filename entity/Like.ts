import { Exclude, classToPlain } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Creator } from './Creator';
import { Snapshot } from './Snapshot';

@Entity({ name: 'likes' })
export class Like extends BaseEntity {
  constructor(like: Partial<Like>) {
    super();
    Object.assign(this, like);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  like_id!: number;

  @ManyToOne(() => Creator, creator => creator.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator_id' })
  creator!: Creator;

  @ManyToOne(() => Snapshot, snapshot => snapshot.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'snapshot_id' })
  snapshot!: Snapshot;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  toJSON() {
    return classToPlain(this);
  }
}
