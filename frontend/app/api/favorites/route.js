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
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const {id, docTitle, docContent } = body;

      await dbQuery({
        sql: "INSERT INTO favorites (id, docTitle, docContent) VALUES (?, ?, ?)",
        values: [id, docTitle, docContent],
      });

      return NextResponse.json({
        success: true,
        message: "Data sparad i databasen",
      });
    } catch (error) {
      console.error("Fel vid POST-förfrågan:", error);
      return NextResponse.json({ success: false, message: "Något gick fel" });
    }
  }

  return NextResponse.error(405, "Method Not Allowed");
}