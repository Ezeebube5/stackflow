import { Sequelize } from "sequelize";
import env from './env.config'

const db = new Sequelize(env.databaseUrl, {dialect: "mysql"});


// Connect to DB
db.sync().then(() => {
    console.log('finally connected to db')
});
export default db;
