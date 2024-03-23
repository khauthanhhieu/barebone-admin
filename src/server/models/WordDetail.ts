import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from "../database";
import Word from './Word';

class WordDetail extends Model<InferAttributes<WordDetail>, InferCreationAttributes<WordDetail>> {
    declare wordId: CreationOptional<number>;
    declare id: CreationOptional<number>;
    declare order: CreationOptional<number>;

    declare definition: CreationOptional<string>;
    declare example: CreationOptional<string>;
    declare synonyms: CreationOptional<string>;
    declare antonyms: CreationOptional<string>;
}

WordDetail.init(
    {
        wordId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: Word, key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

        definition: { type: DataTypes.TEXT, allowNull: true },
        example: { type: DataTypes.TEXT, allowNull: true },
        synonyms: { type: DataTypes.TEXT, allowNull: true },
        antonyms: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        tableName: 'WordDetails',
        sequelize: database
    }
);

export default WordDetail;