import { WordCreateViewModel } from "./WordViewModel";

export interface PractiseViewModel {
    title: string,
    paragraph: string

    words: WordCreateViewModel[]
}

export default PractiseViewModel;
