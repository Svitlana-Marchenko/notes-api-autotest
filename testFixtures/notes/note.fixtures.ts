import { CreateNoteDto, INoteDto } from '../../src/notes/dto/note.dto';

export function randomINoteDto(): INoteDto {
  return {
    id: randomNumber().toString(),
    title: randomString(),
    content: randomString(),
  };
}

export function randomCreateNoteDto(): CreateNoteDto {
  return {
    title: randomString(),
    content: randomString(),
  };
}

export function randomNumber(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomString(length = 10): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('');
}
