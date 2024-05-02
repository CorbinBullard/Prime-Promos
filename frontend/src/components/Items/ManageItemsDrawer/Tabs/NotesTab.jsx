import React from "react";
import NoteCard from "../../../Notes/NoteCard";
import FormModalButton from "../../../UI/FormModalButton";
import { FileAddOutlined } from "@ant-design/icons";
import CreateNoteForm from "../../../Forms/CreateNoteForm";
import useItems from "../../../../hooks/useItems";
import NotesList from "../../../Notes/NotesList";
import { Flex } from "antd";

export default function NotesTab({ item }) {
  const { createItemNote } = useItems({
    projectId: item.projectId,
    itemId: item.id,
  });

  const handleCreateNote = async (form) => {
    await createItemNote(form);
  };

  return (
    <Flex vertical gap={15} style={{ width: "100%" }}>
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
    </Flex>
  );
}
