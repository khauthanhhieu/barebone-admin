import { PractiseLog, Practise } from "../models";

export const GetLogByUserAndFiter = async (userId: number) => {
    return await PractiseLog.findAll({
        where: { userId },
        include: { model: Practise, as: "practise" }
    });
};
