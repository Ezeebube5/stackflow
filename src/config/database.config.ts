import { Sequelize } from "sequelize";
import env from './env.config'

const db = new Sequelize(env.databaseUrl, {dialect: "mysql"});


// Connect to DB
db.sync().then(() => {
    console.log('Main DB Connected')
});
export default db;
