import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })


    /* if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ id: params.id, name: `Sumant_${params.id}` }); */

    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);


}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    // if (!body.name)
    //     return NextResponse.json({ error: 'User not found' }, { status: 400 })

    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    /*  if (params.id > 10)
         return NextResponse.json({ error: "User not found" }, { status: 404 }) 
         return NextResponse.json({ id: 1, name: body.name });
         */

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const updatedUser = await prisma.user.update(
        {
            where: { id: user.id },
            data: {
                name: body.name,
                email: body.email
            }
        }
    )

    return NextResponse.json(updatedUser);


}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.delete({
        where: { id: user.id }
    })

    // some return id of the user to tell user deleted , we are returning empty string that is also fine.
    return NextResponse.json({});
}