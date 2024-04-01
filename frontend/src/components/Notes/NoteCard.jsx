import React, { useState } from "react";
import dayjs from "dayjs";
import { Card, Flex, Modal, Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import OptionsButton from "../UI/OptionsButton";
import CreateNoteForm from "../Forms/CreateNoteForm";

export default function NoteCard({ note, updateNote, deleteNote }) {
  const [isEditting, setIsEditting] = useState(false);
  const [form] = Form.useForm();

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      updateNote({ ...note, ...values });
      cancelEditting();
    });
  };
  const handleDelete = () => {
    Modal.confirm({
      title: "Delete Note",
      content: "Are you sure you want to delete this note?",
      onOk: () => deleteNote(note.id),
    });
  };
  
  const noteOptions = [
    {
      key: "edit",
      label: "Edit Note",
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: () => setIsEditting(true),
    },
    {
      key: "delete",
      label: "Delete Note",
      icon: <DeleteOutlined style={{ color: "red" }} />,

      onClick: handleDelete,
    },
  ];

  const cancelEditting = () => setIsEditting(false);
  return (
    <>
      <Card
        title={note.title}
        extra={
          <Flex align="center" gap={2}>
            {dayjs(note.updatedAt).format("ddd, MMM D")}
            <OptionsButton items={noteOptions} />
          </Flex>
        }
      >
        {note.message}
      </Card>
      <Modal
        open={isEditting}
        onCancel={cancelEditting}
        title="Edit Note"
        onOk={handleUpdate}
      >
        <CreateNoteForm form={form} initialValues={note} />
      </Modal>
    </>
  );
}
