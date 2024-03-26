import { WordCreateViewModel, WordUpdateViewModel } from "./WordViewModel";

export interface PractiseViewModel {
    id: number | undefined,
    title: string,
    paragraph: string

    words: WordCreateViewModel[] | WordUpdateViewModel[]
}

export default PractiseViewModel;
