import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  
  const body = await req.json();
  const { updatedTitle, updatedContent, docPrivate } = body;
  console.log(id, updatedTitle, updatedContent , docPrivate);

  try {
    const sql = "UPDATE docs SET docTitle=?, docContent=? , isPrivate=? WHERE id = ?";
    const values = [updatedTitle, updatedContent,docPrivate, parseInt(id)];

    const result = await dbQuery({ sql, values });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fel vid PATCH-förfrågan:", error);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}


export async function DELETE(req, {params}) {

  const { id } = params;

  const isDeleted = 1;
  console.log(id,isDeleted)
  const result = await dbQuery({ 
      sql: "UPDATE docs SET isDeleted=? WHERE id = ?",
      values: [isDeleted, parseInt(id)]
  }).catch(err => console.error(err));
  
  return NextResponse.json(result, {status: 200});
  }
