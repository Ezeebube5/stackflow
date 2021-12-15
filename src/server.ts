import app from './app';
import env from './config/env.config';



app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
})