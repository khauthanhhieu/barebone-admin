import {
    DataTypes, Model, InferAttributes,
    InferCreationAttributes, ForeignKey
} from 'sequelize';
import database from "../database";
import Practise from './Practise';
import Word from './Word';

class PractiseWord extends Model<InferAttributes<PractiseWord>, InferCreationAttributes<PractiseWord>> {
    declare practiseId: ForeignKey<Practise['id']>;
    declare wordId: ForeignKey<Word['id']>;
    declare order: number;
}

PractiseWord.init(
    {
        practiseId: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
        wordId: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    },
    {
        tableName: 'practiseWords',
        sequelize: database,
        timestamps: false
    }
);

export default PractiseWord;
