import { Database } from '../../shared/mysql.utils';
import userTable from './user.service';

(async () => {
    await Database.connect('test');
    console.log('[mysql] Connected');

    const [result] = await userTable.getMany({
        page: 1,
        pageSize: 5,
        sortBy: 'email',
        sortOrder: 'desc',
        searchText: 'ra',
        searchField: 'email',
    });
    console.log('R', result);

    // const [iResult] = await userTable.insertOne(connection, 'test', { name: 'Mradul', email: 'mradul@test.com' });
    // console.log('iResult', iResult);

    // const [iResult] = await userTable.insertMany(connection, 'test', [
    //     { name: 'Ac', email: 'ac@test.com' },
    //     { name: 'Ad', email: 'ad@test.com' },
    // ]);
    // console.log('iResult', iResult);

    await Database.disconnect();
    console.log('[mysql] Connection Closed');
})();
