import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from "../database";

class Practise extends Model<InferAttributes<Practise>, InferCreationAttributes<Practise>> {
    declare id: CreationOptional<number>;
    declare title: CreationOptional<string>;
    declare paragraph: CreationOptional<string>;
    declare createdAt: Date;
    declare updatedAt: Date;
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