import WordViewModel, { WordTreeListModel } from "../viewModels/WordViewModel";

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

export function getWordGridViewData(words: WordViewModel[]) {
    const result = [];

    result.push([ GRID_COLUMNS.map(col => col.title) ]);

    words.forEach(word => {
        const values = [] as (string | number)[];
        GRID_COLUMNS.forEach(({ field }) => {
            values.push(word[field as keyof WordViewModel] ?? "");
        });

        result.push([values]);
    });

    return result;
};

export function getWordTreeListViewData(models: WordViewModel[]) {
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