import {
    DataTypes, Model, InferAttributes, InferCreationAttributes,
    ForeignKey, CreationOptional, NonAttribute
} from 'sequelize';
import database from "../database";
import Practise from './Practise';
import User from './User';

class PractiseLog extends Model<InferAttributes<PractiseLog>, InferCreationAttributes<PractiseLog>> {
    declare id: CreationOptional<number>;
    declare practiseId: ForeignKey<Practise['id']>;
    declare userId: ForeignKey<User['id']>;
    declare time: Date;

    declare practise: NonAttribute<Practise>;
}

PractiseLog.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        time: { type: DataTypes.DATE, allowNull: false },
    },
    {
        tableName: 'PractiseLogs',
        sequelize: database,
        timestamps: true,
        updatedAt: false,
        createdAt: "time",
    }
);

PractiseLog.removeAttribute('id');

export default PractiseLog;
