import { NoteEntity } from '../entity/note.entity';
import { CreateNoteDto, INoteDto } from '../dto/note.dto';

export function mapCreateNoteDtoToNoteEntity(dto: CreateNoteDto): NoteEntity {
  const entity = new NoteEntity();
  entity.title = dto.title;
  entity.content = dto.content ?? '';
  return entity;
}

export function mapNoteEntityToNoteDto(entity: NoteEntity): INoteDto {
  return {
    id: entity.id,
    title: entity.title,
    content: entity.content,
  };
}
