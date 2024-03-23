import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import CustomJWT from "~/types/custom-jwt";
import { PractiseLogService } from "~/server/service";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request }) as CustomJWT;
    return NextResponse.json({ userId: token.id });
}

type Payload = {
    practiseId: number;
    clientTime: string;
}

export async function POST(request: NextRequest) {
    const token = await getToken({ req: request }) as CustomJWT;
    const data = await request.json() as Payload;
    if (!data.clientTime) {
        data.clientTime = new Date().toISOString();
    }

    const practiseLogs = await PractiseLogService.GetLogByUserAndFiter(token.id);

    return NextResponse.json({ data: practiseLogs });
}