import { NextResponse } from "next/server";
import Connection from "../../../../mongodb";
import Users from "../../../../schema/users";
export async function POST(req: Request) {
  Connection();
  try {
        const body = await req.json();
    const data =await Users.findOne({Mail:body.Mail});
    if(data===null){
        const data = new Users(body);
        await data.save();
        return NextResponse.json({message:"Welcome you're Registered"});
    }else{
        return NextResponse.json({message:"Welcome You're LoggedIn"});
    }
    
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  Connection();
  try {
      const { searchParams } = new URL(req.url);
      const param = searchParams.get("Mail");
    const data = await Users.findOne({ Mail: param });
      return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  Connection();
  try {
    const res=await req.json()
    const data = await Users.findOne({ Mail: res.Mail});
    await data.URLS.push(res.URLS);
    await data.save()
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}