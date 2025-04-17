import { Injectable, NotFoundException } from '@nestjs/common';
import { INotesService } from './notes.service.interface';
import {
  ICreateNoteDto,
  INoteDto,
  INoteListDto,
  IUpdateNoteDto,
} from './dto/note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './entity/note.entity';
import { Repository } from 'typeorm';
import {
  mapCreateNoteDtoToNoteEntity,
  mapNoteEntityToNoteDto,
} from './mapper/note.mapper';

@Injectable()
export class NotesService implements INotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(dto: ICreateNoteDto): Promise<INoteDto> {
    const entity = mapCreateNoteDtoToNoteEntity(dto);
    const saved = await this.noteRepository.save(entity);
    return mapNoteEntityToNoteDto(saved);
  }

  async deleteById(id: string): Promise<{ success: boolean }> {
    await this.noteRepository.delete(id);
    return { success: true };
  }

  async getAll(): Promise<INoteListDto> {
    const notes = await this.noteRepository.find();
    return { items: notes.map(mapNoteEntityToNoteDto) };
  }

  async getById(id: string): Promise<INoteDto> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} was not found`);
    }
    return mapNoteEntityToNoteDto(note);
  }

  async update(id: string, dto: IUpdateNoteDto): Promise<INoteDto> {
    const note = await this.getById(id);

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} was not found`);
    }

    if (dto.title !== undefined) {
      note.title = dto.title;
    }

    if (dto.content !== undefined) {
      note.content = dto.content;
    }

    return mapNoteEntityToNoteDto(await this.noteRepository.save(note));
  }
}
