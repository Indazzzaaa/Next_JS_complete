import { NextRequest, NextResponse } from "next/server";


export function GET(request: NextRequest, { params }: { params: { id: number } }) {
    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ id: params.id, name: `Sumant_${params.id}` });

}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json();
    if (!body.name)
        return NextResponse.json({ error: 'User not found' }, { status: 400 })

    if (params.id > 10)
        return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({ id: 1, name: body.name });
}

export function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    if (params.id > 10)
        return NextResponse.json({ erro: "User not found" }, { status: 404 })
    // some return id of the user to tell user deleted , we are returning empty string that is also fine.
    return NextResponse.json({});
}