import { NextRequest, NextResponse } from "next/server";
import { PractiseService } from "~/DAL/service";

export async function PUT(request: NextRequest) {
    try {
        const practiseId = Number(request.nextUrl.searchParams.get("practiseId"));
        const wordIds = await request.json() as number[];

        const data = await PractiseService.SetWords(practiseId, wordIds);

        return NextResponse.json({ success: true, data });
    } catch(e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
