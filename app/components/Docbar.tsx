import React from "react";
import EditDocButton from "./EditDocButton";
import AddNewButton from "./AddNewButton";
import { DocumentAPI } from "../Interfaces";


const Docbar = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/doctext`, {
    cache: "no-store",
  });
  const data: DocumentAPI = await res.json();
  const docData = data.products;

  return (
    <>
      <div className=" px-2 text-center w-[25%] bg-amber-50">
        <AddNewButton />
        <h2 className="mt-2 text-center text-xl font-semibold underline py-4">
          Documents
        </h2>
        <ul className="mt-4 text-center flex flex-col justify-center gap-2">
          <EditDocButton docs={docData} />
        </ul>
      </div>
    </>
  );
};

export default Docbar;
