import React from "react";
import { Flex } from "antd";
import NoteCard from "./NoteCard";
import useItems from "../../hooks/useItems";

export default function NotesList({ item }) {
  const { updateItemNote, deleteItemNote } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  return (
    <Flex vertical gap={10} style={{ width: "100%" }}>
      {item.Notes.map((note) => (
        <NoteCard
          note={note}
          key={note.id}
          updateNote={updateItemNote}
          deleteNote={deleteItemNote}
        />
      ))}
    </Flex>
  );
}
