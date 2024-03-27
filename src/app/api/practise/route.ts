import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Practise } from "~/DAL/models";
import { PractiseService as service } from "~/DAL/service";
import PractiseViewModel from "~/DAL/viewModels/PractiseViewModel";
import CustomJWT from "~/types/custom-jwt";

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
            const token = await getToken({ req: request }) as CustomJWT;
            model = await service.CreateIncludesWord(data as PractiseViewModel, token.id);
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
        const data = await request.json();
        const paramId = request.nextUrl.searchParams.get("id");
        const includesWords = Boolean(request.nextUrl.searchParams.get("includesWords"));
    
        if (!data.id) {
            data.id = Number(paramId);
        }

        let model = null;
        if (includesWords) {
            const token = await getToken({ req: request }) as CustomJWT;
            model = await service.UpdateIncludesWords(data as PractiseViewModel);
        } else {
            model = await service.Update(data as Practise);
        }

        return NextResponse.json({ success: true, data: model });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
