import { Practise, PractiseLog, PractiseWord, Word } from "../models";
import { WordService, PractiseLogService } from ".";
import PractiseViewModel from "../viewModels/PractiseViewModel";
import { UpdateFromViewModels } from "./Word";

export async function Create(data: Practise) {
    return await Practise.create(data);
};

export async function CreateIncludesWord(data: PractiseViewModel, userId: number) {
    const { words, ...practise } = data;

    const [ model, wordModels ] = await Promise.all([
        Practise.create(practise as Practise),
        WordService.CreateFromViewModels(words)
    ]);

    await SetWords(model.id, wordModels.map(model => model.id));
    await PractiseLogService.CreateLog({ userId, practiseId: model.id, time: new Date() } as PractiseLog);

    // TODO: need to convert true JSON
    return { ...model, words: wordModels };
};

export async function Update(data: Practise) {
    const { id, ...values } = data;

    const model = await Practise.findByPk(id);
    return await model?.update(values);
};

export async function UpdateIncludesWords(data: PractiseViewModel) {
    const { id, words, ...values } = data;

    const model = await Practise.findByPk(id);

    if (model) {
        const [newModel, newWordModels] = await Promise.all([
            model.update(values),
            UpdateFromViewModels(words)
        ]);
    
        await SetWords(
            newModel.id,
            newWordModels.filter(model => model != undefined).map(model => (model as Word).id)
        );

        return { ...newModel, words: newWordModels };
    }

    return null;
}

export async function SetWords(practiseId: number, wordIds: number[]) {
    const models = wordIds.map((wordId, index) => ({
        practiseId,
        wordId,
        order: index + 1
    } as PractiseWord));

    await PractiseWord.destroy({ where: { practiseId } });
    return await PractiseWord.bulkCreate(models);
}