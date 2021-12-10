import app from './app';
import env from './config/env.config';
import db from './config/database.config'

// Connect to DB
db.sync().then(()=>{
console.log('connected to db')
})

app.listen(env.port, ()=>{
    console.log(`listening on port ${env.port}`)
})