import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from "../database";
import Practise from './Practise';

class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
    declare id: CreationOptional<number>;
    declare practiseId: CreationOptional<number>;

    declare order: CreationOptional<number>;
    declare word: CreationOptional<string>;
    declare type: CreationOptional<string>;

    declare wordFamily: CreationOptional<string>;

    declare createdAt: Date;
    declare updatedAt: Date;
}

Word.init(
    {
        practiseId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: Practise, key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        word: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
        type: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },

        wordFamily: { type: DataTypes.TEXT, allowNull: true },

        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
        tableName: 'words',
        sequelize: database
    }
);

export default Word;