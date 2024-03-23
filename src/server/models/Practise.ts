import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Association, NonAttribute } from 'sequelize';
import database from "../database";
import PractiseLog from "./PractiseLog";
import Word from "./Word";

class Practise extends Model<InferAttributes<Practise>, InferCreationAttributes<Practise>> {
    declare id: CreationOptional<number>;
    declare title: CreationOptional<string>;
    declare paragraph: CreationOptional<string>;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare words?: NonAttribute<Word[]>;
    declare static associations: {
        words: Association<Practise, Word>;
    };
}

Practise.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true }
        },
        paragraph: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { notEmpty: true }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'practises',
        sequelize: database
    }
);

export default Practise;
