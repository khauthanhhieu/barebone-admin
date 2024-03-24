import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import CustomJWT from "~/types/custom-jwt";
import { PractiseLogService as service, WordService } from "~/DAL/service";
import { PractiseLog } from "~/DAL/models";
import WordViewModel from "~/DAL/viewModels/WordViewModel";

enum DataType {
    LOGS = "logs",
    WORDS = "words"
}

enum WordDisplayFormat {
    GRID = "grid",
    TREE_LIST = "treeList"
}

type FilterParams = {
    from: Date | null,
    to: Date | null,
    keyword: string | null
}

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request }) as CustomJWT;

        const dataType = request.nextUrl.searchParams.get("dataType") as DataType;
        const displayFormat = request.nextUrl.searchParams.get("displayFormat") as WordDisplayFormat;

        const from = request.nextUrl.searchParams.get("from");
        const to = request.nextUrl.searchParams.get("to");

        const fromTime = from ? new Date(from) : null;
        const toTime = to ? new Date(to) : null;
        const keyword = request.nextUrl.searchParams.get("keyword");

        const filter = { from: fromTime, to: toTime, keyword } as FilterParams;

        let data = null;

        let formatWords: Function;
        switch (displayFormat) {
            case WordDisplayFormat.GRID: {
                formatWords = WordService.GetWordGridViewData;
                break;
            }
            case WordDisplayFormat.TREE_LIST: {
                formatWords = WordService.GetWordTreeListViewData;
                break;
            }
            default: {
                formatWords = (words: WordViewModel[]) => words;
            }
        }

        switch(dataType) {
            case DataType.LOGS: {
                data = await service.GetLogByUserAndFiter(token.id, formatWords, filter);
                break;
            }
            case DataType.WORDS: {
                data = await service.GetLogWordByUserAndFiter(token.id, formatWords, filter);
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
