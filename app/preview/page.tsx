import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { Document, DocumentAPI } from "../Interfaces";


const PreviewPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/doctext`, {
    cache: "no-store",
  });
  const data: DocumentAPI = await res.json();
  const docData = data.products;

  const shortTextField = (text: string, length: number) => {
    if (text.length > length) {
      return text.slice(0, length) + " ...";
    }
    return text;
  };

  const formatDateString = (dateString: string) => {
    const localDate = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
      timeZone: 'Europe/Stockholm',
    };
    return localDate.toLocaleString('sv-SE', options);
};


  return (
    <div className="flex flex-row justify-evenly">
      <div className="flex flex-col justify-around">
        <h1 className=" text-2xl font-bold">Doc Name</h1>
        {docData.map((doc) => (
          <>
            <Link key={doc.product_id} href={`/preview/${doc.product_id}`}>
              <div className=" flex font-bold" key={doc.product_id}>
                <h2>{doc.product_name}</h2>
              </div>
            </Link>
          </>
        ))}
      </div>
      <div className="flex flex-col justify-around items-center">
        <h1 className=" text-2xl font-bold">Text</h1>
        {docData.map((doc) => (
          <div
            className=" mt-3 w-40 overflow-hidden whitespace-nowrap text-ellipsis"
            key={doc.product_id}
          >
            {parse(shortTextField(doc.text_field, 120))}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-around">
        <h1 className=" text-2xl font-bold">Date</h1>
        {docData.map((doc) => (
          <div className="mt-3" key={doc.product_id}>
            <h2>{formatDateString(doc.date)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
