import {
    DataTypes, Model, InferAttributes, InferCreationAttributes,
    CreationOptional, ForeignKey, NonAttribute
} from 'sequelize';
import database from "../database";
import Word from './Word';

class WordDetail extends Model<InferAttributes<WordDetail>, InferCreationAttributes<WordDetail>> {
    declare id: CreationOptional<number>;
    declare wordId: ForeignKey<Word['id']>;

    declare order: number;

    declare definition: string | null;
    declare example: string | null;
    declare synonyms: string | null;
    declare antonyms: string | null;

    declare word: NonAttribute<Word>;
}

WordDetail.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        order: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

        definition: { type: DataTypes.TEXT, allowNull: true },
        example: { type: DataTypes.TEXT, allowNull: true },
        synonyms: { type: DataTypes.TEXT, allowNull: true },
        antonyms: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        tableName: 'WordDetails',
        sequelize: database,
        timestamps: false
    }
);

export default WordDetail;