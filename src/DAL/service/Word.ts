import { CreateOptions, Op } from "sequelize";
import { Practise, PractiseLog, Word, WordDetail } from "../models";
import WordViewModel, { WordCreateViewModel, WordTreeListModel, getWordFromViewModel } from "../viewModels/WordViewModel";

const GRID_COLUMNS = [
    {
        title: "NO",
        field: "no",
    },
    {
        title: "WORD",
        field: "word",
    },
    {
        title: "TYPE",
        field: "type",
    },

    {
        title: "DEFINITION",
        field: "definition",
    },
    {
        title: "EXAMPLE",
        field: "example",
    },
    {
        title: "SYNONYMS",
        field: "synonyms",
    },
    {
        title: "ANTONYMS",
        field: "antonyms",
    },

    {
        title: "DEFINITION2",
        field: "definition2",
    },
    {
        title: "EXAMPLE2",
        field: "example2",
    },
    {
        title: "SYNONYMS2",
        field: "synonyms2",
    },
    {
        title: "ANTONYMS2",
        field: "antonyms2",
    },

    {
        title: "DEFINITION3",
        field: "definition3",
    },
    {
        title: "EXAMPLE3",
        field: "example3",
    },
    {
        title: "SYNONYMS3",
        field: "synonyms3",
    },
    {
        title: "ANTONYMS3",
        field: "antonyms3",
    },

    {
        title: "WORDFAMILY",
        field: "wordFamily",
    },
];

export async function Create(data: Word, option: CreateOptions) {
    return await Word.create(data, option);
}

export async function CreateFromViewModels(viewModels: WordCreateViewModel[]) {
    const models = viewModels.map(getWordFromViewModel);
    return await Word.bulkCreate(models, { include: { model: WordDetail, as: "details" } });
}

export async function Update(data: Word) {
    const { id, details, ...values } = data;

    const model = await Word.findByPk(id);

    const updatedModel = await model?.update(values);
    if (updatedModel) {
        await WordDetail.destroy({ where: { wordId: id } });

        details?.forEach(detail => detail.wordId = id);
        updatedModel.details = await WordDetail.bulkCreate(details as WordDetail[]);;
    }

    return updatedModel;
}

export async function UpdateFromViewModels(viewModels: WordCreateViewModel[]) {
    const models = viewModels.map(getWordFromViewModel);
    
    const promises = models.map(model => {
        if (model.id) {
            return Update(model);
        } else {
            return Create(model, { include: { model: WordDetail, as: "details" } });
        }
    });

    return await Promise.all(promises);
}

export async function GetWordByPractiseId(practiseId: number) {
    return await Word.findAll({
        attributes: ["id", "word", "type", "wordFamily"],
        where: {
            '$practises->practiseLogs.practiseId$': { [Op.eq]: practiseId }
        },
        include: [
            {
                model: WordDetail,
                as: "details",
                attributes: ["definition", "example", "synonyms", "antonyms"],
                order: [["order", "asc"]],
                limit: 3
            },
            {
                model: Practise,
                as: "practises",
                attributes: ["id", "title", "paragraph"],
                include: [
                    {
                        model: PractiseLog,
                        as: "practiseLogs"
                    }
                ]
            }
        ],
    });
}

export function GetWordGridViewData(words: WordViewModel[]) {
    const result = [];

    result.push([GRID_COLUMNS.map(col => col.title)]);

    words.forEach(word => {
        const values = [] as (string | number)[];
        GRID_COLUMNS.forEach(({ field }) => {
            values.push(word[field as keyof WordViewModel] ?? "");
        });

        result.push([values]);
    });

    return result;
};

export function GetWordTreeListViewData(models: WordViewModel[]) {
    const result = {} as WordTreeListModel;

    models.forEach(model => {
        if (!result[model.word]) {
            result[model.word] = [] as WordViewModel[];
        }
        result[model.word].push(model);
    });

    let index = 0;
    Object.keys(result).forEach(key => {
        result[key].forEach(model => {
            model.no = ++index;
        });
    });

    return result;
};