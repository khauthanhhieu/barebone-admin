import {
    DataTypes, Model, InferAttributes,
    InferCreationAttributes, CreationOptional
} from 'sequelize';
import database from "../database";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare name: string;
    declare avatarUrl: string;
    declare isAdmin: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: new DataTypes.STRING(32),
            allowNull: false
        },
        email: new DataTypes.STRING(56),
        name: new DataTypes.STRING(64),
        avatarUrl: new DataTypes.STRING(128),
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        tableName: 'users',
        sequelize: database
    }
);

export default User;