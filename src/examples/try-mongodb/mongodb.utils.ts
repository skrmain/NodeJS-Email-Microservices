import {
    Collection,
    Db,
    Document,
    Filter,
    FindOptions,
    InsertOneOptions,
    MongoClient,
    ObjectId,
    OptionalUnlessRequiredId,
    UpdateFilter,
    UpdateOptions,
} from 'mongodb';

class Database {
    private _db?: Db;
    async connect(dbUri: string, dbName: string) {
        const client = new MongoClient(dbUri);

        await client.connect();
        this._db = client.db(dbName);
    }

    get db() {
        if (this._db) return this._db;

        throw new Error('DB Not Connected');
    }
}

export default new Database();

export class MongoOperation<T extends Document> {
    private _collection: Collection<T>;
    constructor(db: Db, collectionName: string) {
        this._collection = db.collection<T>(collectionName);
    }

    createOne(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions) {
        return this._collection.insertOne(doc, options);
    }

    async getMany(filter: Filter<T> = {}, options?: FindOptions) {
        return await this._collection.find(filter, options).toArray();
    }

    getOne(filter: Filter<T> = {}, options?: FindOptions) {
        return this._collection.findOne(filter, options);
    }

    updateOne(id: ObjectId, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions) {
        return this._collection.updateOne({ _id: id as any }, update, options);
    }

    deleteOne(id: ObjectId) {
        return this._collection.deleteOne({ _id: id as any });
    }
}
