import db from '../config/database.config'

module.exports = async () => {
await db.close();
console.log('Test DB disconnected!');
};