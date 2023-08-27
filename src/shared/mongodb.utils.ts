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
    WithId,
} from 'mongodb';

export class Database {
    private static _db?: Db;
    private static _client?: MongoClient;
    static async connect(dbUri: string, dbName: string) {
        const client = new MongoClient(dbUri);

        await client.connect();
        this._db = client.db(dbName);
    }

    static disconnect() {
        return this._client?.close();
    }

    static collection<T extends Document>(name: string) {
        if (this._db) return this._db.collection<T>(name);

        throw new Error('DB Not Connected');
    }
}

export class CollectionOperation<T extends Document> {
    private _collection: Collection<T>;
    constructor(collection: Collection<T>) {
        this._collection = collection;
    }

    createOne(doc: OptionalUnlessRequiredId<T>, options?: InsertOneOptions) {
        return this._collection.insertOne(doc, options);
    }

    async getMany(filter: Filter<T> = {}, options?: FindOptions) {
        return await this._collection.find(filter, options).toArray();
    }

    getOne(filter: Filter<T> = {}, options?: FindOptions): Promise<WithId<T> | null> {
        return this._collection.findOne(filter, options);
    }

    // NOTE: For `UpdateFilter<T>` add other Methods as Required
    updateOne(id: ObjectId | string, update: /* UpdateFilter<T> | */ Partial<T>, options?: UpdateOptions) {
        id = typeof id === 'string' ? new ObjectId(id) : id;

        return this._collection.updateOne({ _id: id as any }, { $set: update }, options);
    }

    deleteOne(id: ObjectId | string) {
        id = typeof id === 'string' ? new ObjectId(id) : id;

        return this._collection.deleteOne({ _id: id as any });
    }
}
