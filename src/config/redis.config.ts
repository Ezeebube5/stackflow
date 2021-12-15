import { createClient } from 'redis';
import config from './env.config'

class RedisClient {
    redisClient: any;

    constructor() {
        this.redisClient = createClient({ url: config.redisUrl });
        this.redisClient.connect().then(
            console.log('Redis DB connected!')
        );

        this.redisClient.on('error', (err: any) => { console.error('Redis DB Connection Error:', err) })

    }
    //Save Token to Redis DB
    async saveToken(user_id: string, token: string): Promise<string> {
        return await this.redisClient.set(user_id, token);
    }

    //Get Token from Redis DB
    async getToken(user_id: string): Promise<string> {
        return await this.redisClient.get(user_id);
    }

    //Remove Token from Redis DB
    async removeToken(user_id: string): Promise<string> {
        return await this.redisClient.getDel(user_id)
    }

    //Shutdown Redis DB connection
    async shutDown() {
        return await this.redisClient.disconnect();
    }

}


export default new RedisClient();