import { Document } from 'mongodb';

import { Database, CollectionOperation } from '../../shared/mongodb.utils';

interface User {
    name: string;
    email: string;
    isEmailVerified: boolean;
}

class UserService<T extends Document> extends CollectionOperation<T> {}

export default new UserService<User>(Database.collection('users'));
