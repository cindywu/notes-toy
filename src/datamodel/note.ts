import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";
import { nanoid } from "nanoid";
import { z } from "zod";

export const noteSchema = z.object({
  type: z.literal("note"),
  content: z.string(),
  date: z.string(),
});

export type Note = z.infer<typeof noteSchema>;

export async function getNote(
  tx: ReadTransaction,
  id: string
): Promise<Note | null> {
  const jv = await tx.get(key(id));
  if (!jv) {
    console.log(`Specified note ${id} not found.`);
    return null;
  }
  return jv as Note;
}

export function putNote(
  tx: WriteTransaction,
  { id , note }: { id: string; note: Note }
): Promise<void> {
  return tx.put(key(id), note);
}

export async function updateNoteContent(
  tx: WriteTransaction,
  { id, content }: { id: string; content: string }
): Promise<void> {
  const note = await getNote(tx, id);
  if (note) {
    await putNote(tx, {
      id,
      note: {
        ...note,
        content,
      }
    });
  }
}

export async function deleteNote(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id));
}

function key(id: string): string {
  return `${notePrefix}${id}`;
}

export const notePrefix = "note-";

export function randomNote() {
  return {
    id: nanoid(),
    note: {
      type: "note",
      content: "Hello World",
      date: new Date().toISOString(),
    } as Note,
  };
}
