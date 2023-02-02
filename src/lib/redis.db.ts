import { createClient, RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL || '';

interface SetValueParams {
    key: string;
    value: string;
    field?: string;
    type?: 'normal' | 'htype';
}

interface GetValueParams {
    key: string;
    field?: string;
    type?: 'normal' | 'htype';
}

let instance: RedisDB;

class RedisDB {
    private client: RedisClientType;
    constructor() {
        if (instance) {
            throw new Error('Can not re instantiate');
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        instance = this;

        this.client = createClient({ url: REDIS_URL });
        this.client.on('error', (err) => {
            console.log('[redis-error] ' + err);
        });
    }

    public async initialize() {
        await this.connect();
    }

    public async teardown() {
        await this.disconnect();
    }

    private async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    private async disconnect() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }

    public async setValue({ type = 'normal', key, field, value }: SetValueParams) {
        if (!key || !value) {
            throw new Error("'key' and 'value' are required");
        }
        this.connect();
        if (type === 'htype') {
            if (!field) {
                throw Error("Field is required for 'htype'");
            }
            return this.client.hSet(key, field, value);
        }

        return await this.client.set(key, value);
    }

    public async getValue({ type = 'normal', key, field }: GetValueParams) {
        if (!key) {
            throw new Error("'key' is required");
        }

        await this.connect();
        if (type === 'htype') {
            if (field) {
                return this.client.hGet(key, field);
            }
            const value = await this.client.hGetAll(key);
            return JSON.parse(JSON.stringify(value));
        }

        return await this.client.get(key);
    }

    public async hSetValue(key: string, field: string, value: string) {
        return await this.setValue({ key, field, value, type: 'htype' });
    }

    public async hGetValue(key: string, field?: string) {
        return await this.getValue({ key, field, type: 'htype' });
    }

    async delValue(key: string) {
        await this.connect();
        await this.client.del(key);
    }
}

const redisDB = Object.freeze(new RedisDB());
export default redisDB;
