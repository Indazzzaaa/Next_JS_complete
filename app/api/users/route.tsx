import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

// if we remove the request parameter then next js will chache the result of this request.
export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: "Sumant" },
        { id: 2, name: "Rahul" },
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    // this will check following codition in sequenct 1.Body is not empty 2.does body have name parameter 3.if name is there it should not be empty
    /* if (!body.name)
        return NextResponse.json({ error: 'Name is required' }, { status: 400 }) */
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}