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

export default WordViewModel;