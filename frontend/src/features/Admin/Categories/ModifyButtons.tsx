import React from "react";
import Popconfirm from "../../../common/components/Popconfirm";

interface ModifyButtonsProps<T> {
  record: T;
  isEditing: (record: T) => boolean;
  saveOnClick: () => void;
  cancelOnClick: () => void;
  editOnClick: () => void;
  deleteOnClick: () => void;
}

function ModifyButtons<T>({
  record,
  isEditing,
  saveOnClick,
  cancelOnClick,
  editOnClick,
  deleteOnClick,
}: ModifyButtonsProps<T>) {
  return isEditing(record) ? (
    <>
      <a onClick={saveOnClick} style={{ marginRight: 8 }}>
        Opslaan
      </a>
      <Popconfirm title="Zeker dat je wil annuleren?" onConfirm={cancelOnClick}>
        <a>Annuleren</a>
      </Popconfirm>
    </>
  ) : (
    <>
      <a onClick={editOnClick} style={{ marginRight: 8 }}>
        Bewerken
      </a>
      <Popconfirm
        onConfirm={deleteOnClick}
        title="Zeker dat je wil verwijderen?"
      >
        <a style={{ color: "red" }}>Verwijderen</a>
      </Popconfirm>
    </>
  );
}

export default ModifyButtons;
