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


export async function DELETE(req, { params }) {
  const { id } = params;
  console.log(params, id, "HÄR!!");

  try {
    const checkDocumentSql = "SELECT 1 FROM docs WHERE id = ?";
    const checkDocumentValues = [parseInt(id)];

    const checkDocumentResult = await dbQuery({
      sql: checkDocumentSql,
      values: checkDocumentValues,
    });

    if (checkDocumentResult.length === 0) {
      return NextResponse.json({ error: "Dokumentet finns inte i databasen" }, { status: 404 });
    }

    const deleteFavoritesSql = "DELETE FROM favorites WHERE doc_id = ?";
    const deleteFavoritesValues = [parseInt(id)];

    await dbQuery({ sql: deleteFavoritesSql, values: deleteFavoritesValues });

    const deleteDocsSql = "DELETE FROM docs WHERE id = ?";
    const deleteDocsValues = [parseInt(id)];

    const result = await dbQuery({ sql: deleteDocsSql, values: deleteDocsValues });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fel vid DELETE-förfrågan:", error);
    return NextResponse.json({ error: "Något gick fel" }, { status: 500 });
  }
}
