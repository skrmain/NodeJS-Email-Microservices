import { database } from '../../shared/mysql.utils';
import userService from './user.service';

(async () => {
    await database.connect('test');
    console.log('[mysql] Connected');

    const [dbTables] = await database.execute('show tables;');
    console.log({ dbTables });

    // const userService = (await import('./user.service')).default;
    await userService.setup();

    // await userService.insertOne({
    //     name: 'Rahul',
    //     email: 'rahul@example.com',
    //     isEmailVerified: false,
    // });

    // const user = await userService.getOne();
    // console.log({ user });

    const users = await userService.getMany();
    console.log({ users });

    // const [result] = await userTable.getMany({
    //     page: 1,
    //     pageSize: 5,
    //     sortBy: 'email',
    //     sortOrder: 'desc',
    //     searchText: 'ra',
    //     searchField: 'email',
    // });
    // console.log('R', result);

    // const [iResult] = await userTable.insertOne(connection, 'test', { name: 'Mradul', email: 'mradul@test.com' });
    // console.log('iResult', iResult);

    // const [iResult] = await userTable.insertMany(connection, 'test', [
    //     { name: 'Ac', email: 'ac@test.com' },
    //     { name: 'Ad', email: 'ad@test.com' },
    // ]);
    // console.log('iResult', iResult);

    await database.disconnect();
    console.log('[mysql] Connection Closed');
})();
