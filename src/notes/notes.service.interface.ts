import {
  ICreateNoteDto,
  INoteDto,
  INoteListDto,
  IUpdateNoteDto,
} from './dto/note.dto';

export interface INotesService {
  getAll(): Promise<INoteListDto>;
  getById(id: string): Promise<INoteDto>;
  create(dto: ICreateNoteDto): Promise<INoteDto>;
  update(id: string, dto: IUpdateNoteDto): Promise<INoteDto>;
  deleteById(id: string): Promise<{ success: boolean }>;
}
