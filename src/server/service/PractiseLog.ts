import { PractiseLog, Practise, Word, WordDetail } from "../models";
import { Op } from "sequelize";
import { getWordViewModel } from "../viewModels/WordViewModel";
import { getPractiseLogViewModel } from "../viewModels/PractiseLogViewModel";
import * as WordService from "./Word";

export const CreateLog = async (log: PractiseLog) => {
    return await PractiseLog.create(log);
};

export const GetLogByUserAndFiter = async (userId: number, formatWords: Function) => {
    const logs = await PractiseLog.findAll({
        where: { userId },
        attributes: ["id", "time"],
        order: [
            ["time", "desc"],
        ],
        include: {
            model: Practise,
            as: "practise",
            attributes: ["id", "title", "paragraph"],
            // include: [{
            //     model: Word,
            //     as: "words",
            //     attributes: ["id", "word", "type", "wordFamily"],
            //     order: ["PractiseWord", "order", "asc"],
            //     subQuery: true,
            //     include: [{
            //         model: WordDetail,
            //         as: "details",
            //         attributes: ["definition", "example", "synonyms", "antonyms"],
            //         order: [["order", "asc"]],
            //         // limit: 3
            //     }]
            // }]
        },
    });

    const logViewModels = logs.map(getPractiseLogViewModel);

    for (const log of logViewModels) {
        const words = await WordService.GetWordByPractiseId(log.practiseId);
        const wordViewModels = words.map(getWordViewModel);
        log.words = formatWords(wordViewModels);
    }

    return logViewModels;
};

export const GetLogWordByUserAndFiter = async (userId: number, formatWords: Function) => {
    const words = await Word.findAll({
        attributes: ["id", "word", "type", "wordFamily"],
        where: {
            '$practises->practiseLogs.userId$': { [Op.eq]: userId }
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

    const viewModels = words.map(getWordViewModel);
    return formatWords(viewModels);
};
