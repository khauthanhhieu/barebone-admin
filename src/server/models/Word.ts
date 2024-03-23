import {
    DataTypes, Model, InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey, NonAttribute, Association
} from 'sequelize';
import database from "../database";
import Practise from './Practise';
import WordDetail from './WordDetail';

class Word extends Model<InferAttributes<Word>, InferCreationAttributes<Word>> {
    declare id: CreationOptional<number>;
    declare practiseId: ForeignKey<Practise['id']>;

    declare order: number;
    declare word: string;
    declare type: string;

    declare wordFamily: CreationOptional<string>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare practise: NonAttribute<Practise>;

    declare details?: NonAttribute<WordDetail[]>;
    declare static associations: {
        details: Association<Word, WordDetail>;
    };
}

Word.init(
    {
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