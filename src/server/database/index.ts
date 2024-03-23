import { Dialect, Sequelize } from "sequelize";
import config from "./config.json";
import mysql2 from 'mysql2';

const envConfig = config[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password || undefined,
    {
        dialect: envConfig.dialect as Dialect,
        dialectModule: envConfig.dialect == "mysql" ? mysql2 : undefined, // Needed to fix sequelize issues with WebPack
        timezone: envConfig.timezone,
        host: envConfig.host,
        port: envConfig.port || undefined
    }
);

export default sequelize;
