import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client"

// if we remove the request parameter then next js will chache the result of this request.
export async function GET(request: NextRequest) {

    const users = await prisma.user.findMany()
    /* return NextResponse.json([
        { id: 1, name: "Sumant" },
        { id: 2, name: "Rahul" },]) */

    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    // this will check following codition in sequenct 1.Body is not empty 2.does body have name parameter 3.if name is there it should not be empty
    /* if (!body.name)
        return NextResponse.json({ error: 'Name is required' }, { status: 400 }) */
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    // check whether user present or not otherwise we'll get error if we try to insert the user which is alreay present in our database with same email
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    });

    if (user)
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })


    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })

    // return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
    return NextResponse.json(newUser, { status: 201 });
}