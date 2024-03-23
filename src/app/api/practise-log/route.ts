import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import CustomJWT from "~/types/custom-jwt";
import { PractiseLogService } from "~/server/service";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;
        return NextResponse.json({ success: true, userId: token.id });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, userId: null }, { status: 500 });
    }
}

type Payload = {
    practiseId: number;
    clientTime: string;
}

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;
        const data = await request.json() as Payload;
        if (!data.clientTime) {
            data.clientTime = new Date().toISOString();
        }
    
        const practiseLogs = await PractiseLogService.GetLogByUserAndFiter(token.id);
    
        return NextResponse.json({ success: true, data: practiseLogs });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, data: null }, { status: 500 });
    }
}