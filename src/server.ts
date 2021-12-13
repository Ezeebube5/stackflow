import app from './app';
import env from './config/env.config';
import db from './config/database.config'



app.listen(env.port, ()=>{
    console.log(`listening on port ${env.port}`)
})