import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

const sequelize = new Sequelize(
    process.env.DB_NAME ?? "barebone",
    process.env.DB_USERNAME ?? "root",
    process.env.DB_PASSWORD ?? "",
    {
        dialect: 'mysql',
        dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
        host: process.env.DB_HOST ?? "localhost",
        port:  Number(process.env.DB_PORT)
    }
);

export default sequelize;