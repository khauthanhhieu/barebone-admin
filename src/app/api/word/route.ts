import { NextRequest, NextResponse } from "next/server";
import { Word, WordDetail } from "~/DAL/models";
import { WordService as service } from "~/DAL/service";
import { WordCreateViewModel } from "~/DAL/viewModels/WordViewModel";

export async function POST(request: NextRequest) {
    try {
        const viewModel = await request.json() as WordCreateViewModel;

        const details = [] as WordDetail[];

        if (viewModel.definition || viewModel.example || viewModel.antonyms || viewModel.synonyms) {
            details.push({
                order: 1,
                definition: viewModel.definition,
                example: viewModel.example,
                antonyms: viewModel.antonyms,
                synonyms: viewModel.synonyms
            } as WordDetail);
        }

        if (viewModel.definition2 || viewModel.example2 || viewModel.antonyms2 || viewModel.synonyms2) {
            details.push({
                order: 2,
                definition: viewModel.definition2,
                example: viewModel.example2,
                antonyms: viewModel.antonyms2,
                synonyms: viewModel.synonyms2
            } as WordDetail);
        }

        if (viewModel.definition3 || viewModel.example3 || viewModel.antonyms3 || viewModel.synonyms3) {
            details.push({
                order: 3,
                definition: viewModel.definition3,
                example: viewModel.example3,
                antonyms: viewModel.antonyms3,
                synonyms: viewModel.synonyms3
            } as WordDetail);
        }

        const data = {
            word: viewModel.word,
            type: viewModel.type,
            wordFamily: viewModel.wordFamily,
            details
        } as Word;

        const model = await service.Create(data as Word, { include: { model: WordDetail, as: "details" } });
        return NextResponse.json({ success: true, data: model }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
