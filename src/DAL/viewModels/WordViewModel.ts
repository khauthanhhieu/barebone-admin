import { Word, WordDetail } from "../models";

export interface WordCreateViewModel {
    type: string,
    word: string,

    definition: string | null,
    example: string | null,
    synonyms: string | null,
    antonyms: string | null,

    definition2: string | null,
    example2: string | null,
    synonyms2: string | null,
    antonyms2: string | null,

    definition3: string | null,
    example3: string | null,
    synonyms3: string | null,
    antonyms3: string | null,

    wordFamily: string | null,
}

export interface WordUpdateViewModel extends WordCreateViewModel {
    id: number | undefined
}

interface WordViewModel extends WordCreateViewModel {
    no: number
}

export interface WordTreeListModel {
    [key: string]: WordViewModel[];
}

// export function getWordViewModel(input: Word) {
//     const result = { word: input.word, type: input.type, wordFamily: input.wordFamily as string } as WordViewModel;
    
//     input.details?.map((detail, index) => {
//         switch(index) {
//             case 0: {
//                 result.definition = detail.definition;
//                 result.example = detail.example;
//                 result.synonyms = detail.synonyms;
//                 result.antonyms = detail.antonyms;
//                 break;
//             }
//             case 1: {
//                 result.definition2 = detail.definition;
//                 result.example2 = detail.example;
//                 result.synonyms2 = detail.synonyms;
//                 result.antonyms2 = detail.antonyms;
//                 break;
//             }
//             case 2: {
//                 result.definition3 = detail.definition;
//                 result.example3 = detail.example;
//                 result.synonyms3 = detail.synonyms;
//                 result.antonyms3 = detail.antonyms;
//                 break;
//             }
//         }
//     });

//     return result;
// }

export function getWordViewModel(input: Word, index: number) {
    const details = (input.details || []) as WordDetail[];

    return {
        no: index + 1,
        word: input.word,
        type: input.type,

        definition: details[0]?.definition ?? null,
        example: details[0]?.example ?? null,
        synonyms: details[0]?.synonyms ?? null,
        antonyms: details[0]?.antonyms ?? null,
    
        definition2: details[1]?.definition ?? null,
        example2: details[1]?.example ?? null,
        synonyms2: details[1]?.synonyms ?? null,
        antonyms2: details[1]?.antonyms ?? null,
    
        definition3: details[2]?.definition ?? null,
        example3: details[2]?.example ?? null,
        synonyms3: details[2]?.synonyms ?? null,
        antonyms3: details[2]?.antonyms ?? null,

        wordFamily: input.wordFamily as string,
    } as WordViewModel;
}

export function getWordFromViewModel(viewModel: WordCreateViewModel | WordUpdateViewModel) {
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

    const result = {
        word: viewModel.word,
        type: viewModel.type,
        wordFamily: viewModel.wordFamily,
        details
    } as Word;

    if ("id" in viewModel) {
        result.id = viewModel.id as number;
    }

    return result;
}

export default WordViewModel;