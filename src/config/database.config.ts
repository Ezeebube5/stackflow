import { Sequelize } from "sequelize";
import env from './env.config'


//TODO: change this to env var
const db = new Sequelize(env.databaseUrl, {dialect: "mysql"});

export default db;
