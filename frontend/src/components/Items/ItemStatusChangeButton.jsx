import React from "react";

export default function ItemStatusChangeButton({ item }) {
  const handleChangeStatus = (e) => {
    e.stopPropagation();
    console.log("Change status", item);
  };

  
  return <div>Status Change button</div>;
}
