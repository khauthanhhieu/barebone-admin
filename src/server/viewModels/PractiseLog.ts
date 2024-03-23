import type WordViewModel from "./Word";

type PractiseLog = {
    id: number,
    time: Date,
    title: string,
    paragraph: string,
    words: WordViewModel
}

export default PractiseLog;