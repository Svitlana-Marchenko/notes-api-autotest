import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import {
  INoteDto,
  INoteListDto,
  CreateNoteDto,
  UpdateNoteDto,
} from './dto/note.dto';
import { NotFoundException } from '@nestjs/common';
import {
  randomCreateNoteDto,
  randomINoteDto,
  randomNumber,
  randomString,
} from '../../testFixtures/notes/note.fixtures';

describe('NotesController Unit Tests', () => {
  let notesController: NotesController;

  const mockNotesService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: 'INotesService',
          useValue: mockNotesService,
        },
      ],
    }).compile();

    notesController = moduleRef.get<NotesController>(NotesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('controller should be defined', () => {
    expect(notesController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a list of notes when always', async () => {
      // GIVEN
      const randomNoteList: INoteListDto = {
        items: [randomINoteDto(), randomINoteDto()],
      };
      mockNotesService.getAll.mockResolvedValue(randomNoteList);

      // WHEN
      const result = await notesController.getAll();

      // THEN
      expect(result).toEqual(randomNoteList);
      expect(mockNotesService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a note by id when note with id exist', async () => {
      // GIVEN
      const randomNote: INoteDto = randomINoteDto();
      mockNotesService.getById.mockResolvedValue(randomNote);

      // WHEN
      const result = await notesController.getById(randomNote.id);

      // THEN
      expect(result).toEqual(randomNote);
      expect(mockNotesService.getById).toBeCalledWith(randomNote.id);
      expect(mockNotesService.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when note not found', async () => {
      // GIVEN
      const randomId = randomNumber().toString();
      mockNotesService.getById.mockRejectedValue(new NotFoundException());

      // WHEN - THEN
      await expect(notesController.getById(randomId)).rejects.toThrow(
        new NotFoundException(),
      );

      expect(mockNotesService.getById).toBeCalledWith(randomId);
      expect(mockNotesService.getById).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return a note when always', async () => {
      // GIVEN
      const dto: CreateNoteDto = randomCreateNoteDto();
      const created: INoteDto = randomINoteDto();
      mockNotesService.create.mockResolvedValue(created);

      // WHEN
      const result = await notesController.create(dto);

      // THEN
      expect(result).toEqual(created);
      expect(mockNotesService.create).toHaveBeenCalledWith(dto);
      expect(mockNotesService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update and return a note when always', async () => {
      // GIVEN
      const randomId = randomNumber().toString();
      const dto: UpdateNoteDto = { title: randomString() };
      const updated: INoteDto = randomINoteDto();

      mockNotesService.update.mockResolvedValue(updated);

      // WHEN
      const result = await notesController.update(randomId, dto);

      // THEN
      expect(result).toEqual(updated);
      expect(mockNotesService.update).toHaveBeenCalledWith(randomId, dto);
      expect(mockNotesService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a note and return success when always', async () => {
      // GIVEN
      const randomId = randomNumber().toString();
      mockNotesService.deleteById.mockResolvedValue({ success: true });
      mockNotesService.getById.mockResolvedValue(randomINoteDto());

      // WHEN
      const result = await notesController.delete(randomId);

      // THEN
      expect(result).toEqual({ success: true });
      expect(mockNotesService.deleteById).toHaveBeenCalledWith(randomId);
      expect(mockNotesService.deleteById).toHaveBeenCalledTimes(1);
    });
  });
});
