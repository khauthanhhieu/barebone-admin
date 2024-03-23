import { PractiseLog, Practise, Word, WordDetail } from "../models";

export const GetLogByUserAndFiter = async (userId: number) => {
    return await PractiseLog.findAll({
        where: { userId },
        attributes: ["id", "time"],
        order: [
            ["time", "desc"],
            ["practise", "words", "order", "asc"],
        ],
        include: {
            model: Practise,
            as: "practise",
            attributes: ["id", "title", "paragraph"],
            include: [{
                model: Word,
                as: "words",
                attributes: ["id", "word", "type", "wordFamily"],
                subQuery: true,
                include: [{
                    model: WordDetail,
                    as: "details",
                    attributes: ["definition", "example", "synonyms", "antonyms"],
                    order: [[ "order", "asc" ]],
                    limit: 3
                }]
            }]
        }
    });
};
