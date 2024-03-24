import { PractiseLog, Practise, PractiseWord, User, Word, WordDetail } from "../models";

export const CreateLog = async (log: PractiseLog) => {
    await PractiseLog.create(log);
};

export const GetLogByUserAndFiter = async (userId: number) => {
    return await PractiseLog.findAll({
        where: { userId },
        attributes: ["id", "time"],
        order: [
            ["time", "desc"],
        ],
        include: {
            model: Practise,
            as: "practise",
            attributes: ["id", "title", "paragraph"],
            include: [{
                model: Word,
                as: "words",
                attributes: ["id", "word", "type", "wordFamily"],
                order: ["PractiseWord", "order", "asc"],
                subQuery: true,
                include: [{
                    model: WordDetail,
                    as: "details",
                    attributes: ["definition", "example", "synonyms", "antonyms"],
                    order: [["order", "asc"]],
                    limit: 3
                }]
            }]
        }
    });
};
