import React from "react";
import parse from "html-react-parser";

interface Document {
  product_id: number;
  product_name: string;
  text_field: string;
  text_color: string;
  bg_color: string;
  date: string;
}

interface DocumentAPI {
  products: Document[];
}

async function singleDocument({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/doctext`, {
    cache: "no-store",
  });

  const data: DocumentAPI = await res.json();
  const docData = data.products;

  const findPageId = docData.find(
    (data) => data.product_id === parseInt(params.id)
  );

  if (!findPageId) {
    return <h1 className=" flex justify-center text-6xl">PAGE NOT FOUND !</h1>;
  }

  const pageFormater = (
    <div className="gap-5 mt-10 px-20 flex flex-col justify-center">
      <h1 className="text-center text-4xl font-semibold">
        {findPageId.product_name}
      </h1>

      <div className="text-3xl bg-transparent mt-10">
        {parse(findPageId.text_field)}
      </div>
    </div>
  );

  return <div className="px-10">{pageFormater}</div>;
}

export default singleDocument;
