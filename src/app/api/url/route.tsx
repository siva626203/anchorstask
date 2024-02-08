import Connection from "../../../../mongodb";
import Users from "../../../../schema/users";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  Connection();
  try {
    const res = await req.json();
   
    const data = await Users.findOne({
      URLS: { $elemMatch: { short: res.short} },
    });
    const url=await data.URLS.filter((data:any)=>{return data.short===res.short})
    const count =await url.map((e:any)=>{return parseInt(e.Click)});
    console.log(parseInt(count));
    const up=await Users.updateOne({Mail:data.Mail,URLS:{$elemMatch:{short:res.short}}},{$set:{"URLS.$.Click":Number(count)+1}})
    console.log(up)
    return NextResponse.json(url);
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  Connection();
  try {
    const res = await req.json();

    const data = await Users.findOne({
      URLS: { $elemMatch: { short: res.short } },
    });
    console.log(data.Mail)
   const up = await Users.updateMany(
     { URLS: { $elemMatch: { short: res.short } } },
     { $pull: { URLS: { short: res.short } } }
   );
    console.log(up);
    return NextResponse.json(up);
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  Connection();
  try {
    const res = await req.json();

    const data = await Users.findOne({
      URLS: { $elemMatch: { short: res.short } },
    });
   
    const up = await Users.updateMany(
      { Mail: data.Mail, URLS: { $elemMatch: { short: res.short } } },
      { $set: { "URLS.$.long":  res.long} }
    );
    console.log(up);
    return NextResponse.json(up);
  } catch (error) {
    return NextResponse.json({ error: "Something wrong" }, { status: 500 });
  }
}
