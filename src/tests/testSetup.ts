import db from '../config/database.config'

module.exports = async () => {
 await db.sync({force:true}).then(()=>{
    console.log('TEST DB connected!')
})

};