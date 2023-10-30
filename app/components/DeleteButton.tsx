"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const DeleteButton = ({docId}) => {
  const router = useRouter();

  const deleteDoc = async (docId: number) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id : docId }),
    };
    const req = await fetch("http://localhost:3000/api/doctext", options);

    router.refresh();
    return req;
  };

  return (
    <div className=" text-2xl hover:cursor-pointer" onClick={() => deleteDoc(docId)}>
      <Icon icon="mdi:delete-outline" />
    </div>
  );
};

export default DeleteButton;
