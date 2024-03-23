import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from "../database";
import Practise from './Practise';
import User from './User';

class PractiseLog extends Model<InferAttributes<PractiseLog>, InferCreationAttributes<PractiseLog>> {
    declare id: CreationOptional<number>;
    declare practiseId: CreationOptional<number>;
    declare userId: CreationOptional<number>;
    declare createdAt: Date;
}

PractiseLog.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        practiseId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: Practise, key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: User, key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'PractiseLogs',
        sequelize: database
    }
);

export default PractiseLog;
