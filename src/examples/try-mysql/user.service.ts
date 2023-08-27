import { Database, DatabaseOperation } from '../../shared/mysql.utils';

class UserService extends DatabaseOperation {}

export default new UserService(Database.connection, Database.dbName, 'users');
