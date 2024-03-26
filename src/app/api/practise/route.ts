import { NextRequest, NextResponse } from "next/server";
import { Practise } from "~/DAL/models";
import { PractiseService as service } from "~/DAL/service";
import PractiseViewModel from "~/DAL/viewModels/PractiseViewModel";

type Payload = {
    title: string;
    paragraph: string;
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as Payload;

        let model = null;

        const includesWords = Boolean(request.nextUrl.searchParams.get("includesWords"));

        if (includesWords) {
            model = await service.CreateIncludesWord(data as PractiseViewModel);
        } else {
            model = await service.Create(data as Practise);
        }

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
        const includesWords = request.nextUrl.searchParams.get("includesWords");

    
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
