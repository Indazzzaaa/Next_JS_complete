import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client"
export async function GET(request: NextRequest) {
    /*  return NextResponse.json([
         { id: 1, name: 'Milk', price: 2.5 },
         { id: 2, name: 'Bread', price: 3.5 }
     ]) */
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    })

    // never use ..body  to copy the parameter , users might inject the additional parameters which we might not require.
    /* return NextResponse.json({ id: 10, name: body.name, price: body.price }, { status: 201 }) */
    return NextResponse.json(newProduct, { status: 201 })
}