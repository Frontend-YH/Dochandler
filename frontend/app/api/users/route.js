import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
  const body = await req.json();

  const { username, password} = body;
  console.log(username,password)



  const result = await dbQuery({ 
      query: "SELECT * FROM users WHERE username=? AND password=?",
      values: ["olof", "olof"]
  })


  if (result) {
    return NextResponse.json(result, { status: 200 });
} else {
    return NextResponse.json({ message: "No matching records found." }, { status: 404 });
}
}catch (error) {
    console.error("Fel vid POST-förfrågan:", error.message);

    return NextResponse.json({ success: false, message: "Något gick fel" });
  }
}
