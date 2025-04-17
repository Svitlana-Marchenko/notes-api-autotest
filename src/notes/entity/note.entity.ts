import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NoteEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, default: '' })
  content: string;
}
