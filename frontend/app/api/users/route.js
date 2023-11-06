import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req, res) {
  const result = await dbQuery({
    sql: "SELECT * FROM users",
    values: [],
  });
  return NextResponse.json(result);
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const result = await dbQuery({ 
      sql: "SELECT * FROM users WHERE username=? AND password=?",
      values: [username, password]
    });

    if (result.length > 0) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({ message: "Inga matchande poster hittades." }, { status: 404 });
    }
  } catch (error) {
    console.error("Fel vid POST-förfrågan:", error.message);
    return NextResponse.json({ success: false, message: "Något gick fel" });
  }
}



