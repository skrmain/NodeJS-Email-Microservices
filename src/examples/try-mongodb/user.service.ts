import { Document } from 'mongodb';

import { Database, DatabaseOperation } from '../../shared/mongodb.utils';

interface User {
    name: string;
    email: string;
    isEmailVerified: boolean;
}

class UserService<T extends Document> extends DatabaseOperation<T> {}

export default new UserService<User>(Database.collection('users'));
