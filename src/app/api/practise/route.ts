import { NextRequest, NextResponse } from "next/server";
import { Practise } from "~/DAL/models";
import { PractiseService as service } from "~/DAL/service";

type Payload = {
    title: string;
    paragraph: string;
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as Payload;
        const model = await service.Create(data as Practise);
        return NextResponse.json({ success: true, data: model }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json() as Practise;
        const paramId = request.nextUrl.searchParams.get("id");

        if (!data.id) {
            data.id = Number(paramId);
        }

        const model = await service.Update(data as Practise);
        return NextResponse.json({ success: true, data: model });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
