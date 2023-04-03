import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";
import { nanoid } from "nanoid";
import { z } from "zod";

export const statusSchema = z.object({
  type: z.literal("status"),
  content: z.string(),
  date: z.string(),
});

export type Status = z.infer<typeof statusSchema>;

export async function getStatus(
  tx: ReadTransaction,
  id: string
): Promise<Status | null> {
  const jv = await tx.get(key(id));
  if (!jv) {
    console.log(`Specified status ${id} not found.`);
    return null;
  }
  return jv as Status;
}

export function putStatus(
  tx: WriteTransaction,
  { id , status }: { id: string; status: Status }
): Promise<void> {
  return tx.put(key(id), status);
}

export async function updateStatusContent(
  tx: WriteTransaction,
  { id, content, date }: { id: string; content: string, date: string }
): Promise<void> {
  const status = await getStatus(tx, id);
  if (status) {
    await putStatus(tx, {
      id,
      status: {
        ...status,
        content,
        date,
      }
    });
  }
}

export async function deleteStatus(
  tx: WriteTransaction,
  id: string
): Promise<void> {
  await tx.del(key(id));
}


function key(id: string): string {
  return `${statusPrefix}${id}`;
}

export const statusPrefix = "status-";

export function randomStatus() {
  return {
    id: nanoid(),
    status: {
      type: "status",
      content: "thinking",
      date: new Date().toISOString(),
    } as Status,
  };
}
