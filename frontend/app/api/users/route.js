import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
  const body = await req.json();

  const { username, password} = body;
  console.log(username,password)



  const result = await dbQuery({ 
      query: "SELECT * FROM users WHERE username=? AND password=?",
      values: [username, password]
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

// import { query } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req, res) {

//     const body = await req.json();

//     const { user, password} = body;
   

//     const result = await query({ 
//         query: "SELECT * FROM authors WHERE BINARY userName=? AND BINARY password=?",
//         values: [user, password]
//     })

    

//     if (result.length === 0) {
//         // No user rows found
//         return NextResponse.json({ message: "No matching records found." }, { status: 404 });
//     } else {
//         // atleast 1 corresponding user-row found
//         return NextResponse.json(result, {status: 200});
//     }
// } 
