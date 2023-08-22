import redisDB from './redis.db';

async () => {
    await redisDB.hSetValue('1', 'name', 'rohan');
    const result = await redisDB.getValue({ key: '1', type: 'htype' });
    console.log('Get', result);
};
