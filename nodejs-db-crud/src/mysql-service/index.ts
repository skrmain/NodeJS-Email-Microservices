import { DatabaseConnection } from './mysql.database';
import userTable from './user.service';

(async () => {
    const connection = await new DatabaseConnection().getConnection();
    if (!connection) {
        throw new Error('My Connection Error');
    }
    console.log('[mysql] Connected');

    const [result] = await userTable.getAll(connection, 'test', {
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

    await connection.end();
    console.log('[mysql] Connection Closed');
})();
