import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import CustomJWT from "~/types/custom-jwt";
import { PractiseLogService as service } from "~/server/service";
import { PractiseLog } from "~/server/models";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;
        const practiseLogs = await service.GetLogByUserAndFiter(token.id);
        const words = practiseLogs.map(log => log.practise?.words);

        return NextResponse.json({ success: true, data: words });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, data: [] }, { status: 500 });
    }
}

type Payload = {
    practiseId: number;
    clientTime: string;
}

export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;
        const { practiseId, clientTime } = await request.json() as Payload;
        const time = clientTime ?? new Date().toISOString();
        
        const log = { practiseId, userId: token.id, time: new Date(time) } as PractiseLog;
        await service.CreateLog(log);

        return NextResponse.json({ success: true, data: log });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}