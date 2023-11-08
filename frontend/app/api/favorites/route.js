import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req, res) {
  const result = await dbQuery({
    sql: "SELECT * FROM favorites",
    values: [],
  });
  return NextResponse.json(result);
} 

export async function POST(req, res) {
  const body = await req.json();
  const { user_id , doc_id} = body;

  const existingFavorite = await dbQuery({
    sql: "SELECT * FROM favorites WHERE user_id = ? AND doc_id = ?",
    values: [ user_id , doc_id],
  });
  if (existingFavorite.length > 0) {
    await dbQuery({
      sql: "DELETE FROM favorites WHERE doc_id = ? AND user_id = ?",
      values: [doc_id, user_id],
    });

    return NextResponse.json({ message: "Favorite removed" }, { status: 200 });
  } else {
    const result = await dbQuery({
      sql: "INSERT INTO favorites (doc_id, user_id) VALUES (?, ?)",
      values: [doc_id, user_id],
    });

    return NextResponse.json(result, { status: 200 });
  }
}

