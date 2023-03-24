import type { Reflect } from "@rocicorp/reflect";
import { useSubscribe } from "replicache-react";
import { getClientState, clientStatePrefix } from "./client-state";
import { getShape, shapePrefix } from "./shape";
import type { M } from "./mutators";
import { getNote, notePrefix } from "./note";

export function useNoteIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const notes = (await tx
        .scan({ prefix: notePrefix })
        .keys()
        .toArray()) as string[];
      return notes.map((k) => k.substring(notePrefix.length));
    },
    []
  );
}

export function useNoteByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getNote(tx, id);
    },
    null
  );
}

export function useNotes(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async(tx) => {
      const items = await tx.scan({ prefix: notePrefix }).entries().toArray();
      return items
    },
    []
  )
}

export function useShapeIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const shapes = (await tx
        .scan({ prefix: shapePrefix })
        .keys()
        .toArray()) as string[];
      return shapes.map((k) => k.substring(shapePrefix.length));
    },
    []
  );
}

export function useShapeByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getShape(tx, id);
    },
    null
  );
}

export function useUserInfo(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).userInfo;
    },
    null
  );
}

export function useOverShapeID(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).overID;
    },
    ""
  );
}

export function useSelectedShapeID(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return (await getClientState(tx, await reflect.clientID)).selectedID;
    },
    ""
  );
}

export function useCollaboratorIDs(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const clientIDs = (await tx
        .scan({ prefix: clientStatePrefix })
        .keys()
        .toArray()) as string[];
      const myClientID = await reflect.clientID;
      return clientIDs
        .filter((k) => !k.endsWith(myClientID))
        .map((k) => k.substr(clientStatePrefix.length));
    },
    []
  );
}

export function useClientInfo(reflect: Reflect<M>, clientID: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getClientState(tx, clientID);
    },
    null
  );
}
