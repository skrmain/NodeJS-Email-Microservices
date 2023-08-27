import { Document, ObjectId } from 'mongodb';

import database, { MongoOperation } from './mongodb.utils';

interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    isEmailVerified: boolean;
}

class UserService<T extends Document> extends MongoOperation<T> {}

export default new UserService<User>(database.db, 'users');
