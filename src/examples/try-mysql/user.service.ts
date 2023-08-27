import { TableOperation, database } from '../../shared/mysql.utils';

export interface User {
    id?: number;
    name: string;
    email: string;
    isEmailVerified: boolean;
}

const tableSchema = `
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    isEmailVerified BOOLEAN,
    PRIMARY KEY (id)
);`;

class UserService<T extends object> extends TableOperation<T> {}

export default new UserService<User>(database, 'users', tableSchema);
