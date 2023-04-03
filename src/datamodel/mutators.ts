import type { WriteTransaction } from "@rocicorp/reflect";
import {
  initClientState,
  setCursor,
  overShape,
  selectShape,
} from "./client-state";
import {
  putShape,
  deleteShape,
  moveShape,
  scanShape,
  resizeShape,
  rotateShape,
  initShapes,
} from "./shape";
import {
  putNote,
  deleteNote,
  updateNoteContent,
} from "./note";
import {
  putStatus,
  updateStatusContent,
} from './status'

export type M = typeof serverMutators;

export const serverMutators = {
  createStatus: putStatus,
  updateStatusContent,
  createNote: putNote,
  deleteNote,
  updateNoteContent,
  createShape: putShape,
  deleteShape,
  moveShape,
  scanShape,
  resizeShape,
  rotateShape,
  initClientState,
  setCursor,
  overShape,
  selectShape,
  initShapes,
  nop: async (_: WriteTransaction) => {},
};

export const clientMutators: M = {
  ...serverMutators,
  initShapes: async () => {},
};
