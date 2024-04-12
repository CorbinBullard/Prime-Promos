import React from "react";
import NoteCard from "../../../Notes/NoteCard";
import FormModalButton from "../../../UI/FormModalButton";
import { FileAddOutlined } from "@ant-design/icons";
import CreateNoteForm from "../../../Forms/CreateNoteForm";
import useItems from "../../../../hooks/useItems";
import NotesList from "../../../Notes/NotesList";

export default function NotesTab({ item }) {

  const { createItemNote, updateItemNote } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const handleCreateNote = async (form) => {
    await createItemNote(form);
  };

  return (
    <>
      <FormModalButton
        icon={<FileAddOutlined />}
        form={CreateNoteForm}
        submitText="Create Note"
        onSubmit={handleCreateNote}
        title="Create Note"
      >
        Create Note
      </FormModalButton>
      <NotesList item={item} />
    </>
  );
}
