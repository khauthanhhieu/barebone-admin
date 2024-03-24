// https://sequelize.org/docs/v6/other-topics/migrations/
// https://sequelize.org/docs/v6/other-topics/typescript/

import User from "./User";
import Practise from "./Practise";
import Word from "./Word";
import PractiseWord from "./PractiseWord";
import WordDetail from "./WordDetail";
import PractiseLog from "./PractiseLog";

Practise.hasMany(PractiseLog, {
    sourceKey: "id",
    foreignKey: {
        field: "practiseId",
        // allowNull: false
    },
    as: "practiseLogs",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

PractiseLog.belongsTo(Practise, {
    targetKey: "id",
    foreignKey: "practiseId",
    as: "practise",
});

User.hasMany(PractiseLog, {
    sourceKey: "id",
    foreignKey: {
        field: "userId",
        // allowNull: false
    },
    as: "practiseLogs",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

PractiseLog.belongsTo(User, {
    targetKey: "id",
    foreignKey: "userId",
    as: "user",
});

Practise.belongsToMany(Word, {
    through: PractiseWord,
    foreignKey: "practiseId",
    as: "words",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Word.belongsToMany(Practise, {
    through: PractiseWord,
    foreignKey: "wordId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Word.hasMany(WordDetail, {
    sourceKey: "id",
    foreignKey: "wordId",
    as: "details",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

export { User, Practise, Word, WordDetail, PractiseLog, PractiseWord };
