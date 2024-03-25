import { Practise, PractiseWord } from "../models";

export async function Create(data: Practise) {
    return await Practise.create(data);
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