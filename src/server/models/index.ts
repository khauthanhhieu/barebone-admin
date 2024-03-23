// https://sequelize.org/docs/v6/other-topics/migrations/
// https://sequelize.org/docs/v6/other-topics/typescript/

import User from "./User";
import Practise from "./Practise";
import Word from "./Word";
import WordDetail from "./WordDetail";
import PractiseLog from "./PractiseLog";

Practise.hasMany(PractiseLog, {
    sourceKey: 'id',
    foreignKey: 'practiseId',
    as: 'practiseLogs',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

PractiseLog.belongsTo(Practise, {
    targetKey: "id",
    foreignKey: "practiseId",
    as: 'practise',
});

Practise.hasMany(Word, {
    sourceKey: 'id',
    foreignKey: 'practiseId',
    as: 'words',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

User.hasMany(PractiseLog, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'practiseLogs',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Word.hasMany(WordDetail, {
    sourceKey: 'id',
    foreignKey: 'wordId',
    as: 'details',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

export { User, Practise, Word, WordDetail, PractiseLog };
