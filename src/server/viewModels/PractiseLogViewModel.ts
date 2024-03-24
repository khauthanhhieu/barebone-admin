import { PractiseLog } from "../models";
import WordViewModel, { WordTreeListModel, getWordViewModel } from "./WordViewModel";

type PractiseLogViewModel = {
    id: number,
    time: Date,
    practiseId: number,
    title: string,
    paragraph: string,
    words: WordTreeListModel[] | string[][][]
}

export function getPractiseLogViewModel(input: PractiseLog) {
    return {
        id: input.id,
        time: input.time,
        practiseId: input.practise.id,
        title: input.practise.title,
        paragraph: input.practise.paragraph,
        // words: input.practise.words?.map(getWordViewModel)
    } as PractiseLogViewModel;
}

export default PractiseLog;