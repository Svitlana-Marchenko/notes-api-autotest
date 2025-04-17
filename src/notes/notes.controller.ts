import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  CreateNoteDto,
  UpdateNoteDto,
  INoteDto,
  INoteListDto,
} from './dto/note.dto';
import { INotesService } from './notes.service.interface';

@Controller('notes')
export class NotesController {
  constructor(
    @Inject('INotesService') private readonly notesService: INotesService,
  ) {}

  @Get()
  async getAll(): Promise<INoteListDto> {
    return this.notesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<INoteDto> {
    return this.notesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNoteDto: CreateNoteDto): Promise<INoteDto> {
    return this.notesService.create(createNoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<INoteDto> {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.notesService.deleteById(id);
  }
}
