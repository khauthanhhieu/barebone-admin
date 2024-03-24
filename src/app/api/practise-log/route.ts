import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import CustomJWT from "~/types/custom-jwt";
import { PractiseLogService as service, WordService } from "~/server/service";
import { PractiseLog } from "~/server/models";

enum DataType {
    LOGS = "logs",
    WORDS = "words"
}

enum WordDisplayFormat {
    GRID = "grid",
    TREE_LIST = "treeList"
}

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;

        const dataType = request.nextUrl.searchParams.get("dataType") as DataType;
        const displayFormat = request.nextUrl.searchParams.get("displayFormat") as WordDisplayFormat;

        let data = null;

        switch(dataType) {
            case DataType.LOGS: {
                data = await service.GetLogByUserAndFiter(token.id);
                break;
            }
            case DataType.WORDS: {
                const words = await service.GetLogWordByUserAndFiter(token.id);

                switch (displayFormat) {
                    case WordDisplayFormat.GRID: {
                        data = WordService.getWordGridViewData(words);
                        break;
                    }
                    case WordDisplayFormat.TREE_LIST: {
                        data = WordService.getWordTreeListViewData(words);
                        break;
                    }
                    default: {
                        data = words;
                    }
                }

                break;
            }
        }

        return NextResponse.json({ success: true, data });
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