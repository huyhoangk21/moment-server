import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Creator } from './Creator';

@Entity({ name: 'snapshots' })
export class Snapshot extends BaseEntity {
  constructor(snapshot: Snapshot) {
    super();
    Object.assign(this, snapshot);
  }

  @PrimaryGeneratedColumn()
  snapshot_id!: number;

  @ManyToOne(() => Creator, creator => creator.snapshots)
  creator!: Creator;

  @Column()
  selected_file!: string;

  @Column()
  like_count!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
