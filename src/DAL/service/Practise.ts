import { Practise, PractiseWord, Word } from "../models";
import { WordService } from ".";
import PractiseViewModel from "../viewModels/PractiseViewModel";

export async function Create(data: Practise) {
    return await Practise.create(data);
};

export async function CreateIncludesWord(data: PractiseViewModel) {
    const { words, ...practise } = data;

    const [ model, wordModels ] = await Promise.all([
        Practise.create(practise as Practise),
        WordService.CreateFromViewModels(words)
    ]);

    await SetWords(model.id, wordModels.map(model => model.id));

    // TODO: need to convert true JSON
    return { ...model, word: wordModels };
};

export async function Update(data: Practise) {
    const { id, ...values } = data;

    const model = await Practise.findByPk(id);
    return await model?.update(values);
};

export async function SetWords(practiseId: number, wordIds: number[]) {
    const models = wordIds.map((wordId, index) => ({
        practiseId,
        wordId,
        order: index + 1
    } as PractiseWord));

    await PractiseWord.destroy({ where: { practiseId } });
    return await PractiseWord.bulkCreate(models);
}