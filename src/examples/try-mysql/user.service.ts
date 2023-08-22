import { DatabaseOperation } from './mysql.database';

class UserTableOperations extends DatabaseOperation {}

export default new UserTableOperations('user');
