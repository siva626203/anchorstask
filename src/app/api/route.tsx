import { NextResponse } from "next/server";
import Connection from "../../../mongodb";
import Users from "../../../schema/users";
export async function POST(req:Request) {
    Connection()
    try {
        const body =await req.json()
        const data=new Users(body)
        await data.save()
    return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json({ error: "Something wrong" },{status: 500});  
    }
  
}
export async function GET() {
    Connection();
    try {
      const data =await Users.find({})
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: "Something wrong" }, { status: 500 });
    }
}
