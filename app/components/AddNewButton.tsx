"use client";

import React, { useContext, useState } from "react";
import { DocContext } from "./DocContext";
import { useRouter } from "next/navigation";


const AddNewButton = () => {
  const { inputValues, setInputValues } = useContext(DocContext);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendForm = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inputValues }),
    };

    const res = await fetch("http://localhost:3000/api/doctext", options);
    router.refresh();
    return res;
  };

  return (
    <div className="mt-3 flex flex-col justify-center items-center">
      <input
        type="text"
        name="product_name"
        onChange={handleChange}
        className="border-2"
        placeholder="Name"
      ></input>
      <button
        onClick={sendForm}
        className="border-2 mt-2 h-9 rounded text-center bg-slate-600 text-neutral-300 flex gap-2 items-center justify-center w-full"
      >
        Create New Document
      </button>
    </div>
  );
};

export default AddNewButton;
