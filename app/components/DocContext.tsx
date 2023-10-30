"use client";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { Document, shortDoc } from "../Interfaces";

interface ContextValue {
  dataValues: Document
  setDataValues: Dispatch<SetStateAction<Document>>
  inputValues: shortDoc
  setInputValues: Dispatch<SetStateAction<shortDoc>>
}


export const DocContext = createContext<ContextValue>({
  dataValues: {
    product_id: null,
    product_name: "",
    text_field: "",
    text_color: "",
    bg_color: "",
    date: "",
  },
  setDataValues: (values: Document) => {},
  inputValues: {
    product_id: null,
    product_name: "",
    text_field: "",
    text_color: "",
    bg_color: "",
  },
  setInputValues: (values: shortDoc) => {},
});

export const DocProvider = ({ children }) => {
  const [dataValues, setDataValues] = useState<Document>({
    product_id: null,
    product_name: "",
    text_field: "",
    text_color: "",
    bg_color: "",
    date: "",
  });

  const [inputValues, setInputValues] = useState<shortDoc>({
    product_id: null,
    product_name: "",
    text_field: "This is some new text...",
    text_color: "black",
    bg_color: "white",
  });

  return (
    <DocContext.Provider
      value={{ inputValues, setInputValues, dataValues, setDataValues }}
    >
      {children}
    </DocContext.Provider>
  );
};
