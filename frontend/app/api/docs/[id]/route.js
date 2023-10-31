import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { updatedTitle, updatedContent } = body;
  console.log(id, updatedTitle, updatedContent);

  try {
    const sql = "UPDATE docs SET docTitle=?, docContent=? WHERE id = ?";
    const values = [updatedTitle, updatedContent, parseInt(id)];

    const result = await dbQuery({ sql, values });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fel vid PATCH-förfrågan:", error);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  console.log(params, id, "HÄR!!");
  try {
    const sql = "DELETE FROM docs WHERE id = ?";
    const values = [parseInt(id)];

    const result = await dbQuery({ sql, values });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fel vid DELETE-förfrågan:", error);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}
