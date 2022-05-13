import { Collection, MongoClient, ObjectId } from 'mongodb';

// Model
interface Product {
    id?: ObjectId;
    name: string;
    price: number;
    category: string;
}

const collections: { Product?: Collection<Product> } = {};

const connectDB = async () => {
    const client = new MongoClient('mongodb://admin:admin@localhost:27017');

    await client.connect();

    const db = client.db('learning');

    const productCollection = db.collection<Product>('products');

    collections.Product = productCollection;

    console.log('DB Connected');
};

// C: Create
const createNew = async (product: Product) => {
    const result = await collections.Product?.insertOne(product);

    return result;
};

// R: Read
const getAll = async () => {
    const result = await collections.Product?.find(
        {},
        {
            sort: { price: 1 },
        }
    ).toArray();

    return result;
};

// R: Read One
const getOne = async (id: ObjectId) => {
    const result = await collections.Product?.findOne(
        { _id: id },
        {
            projection: {
                _id: 0,
            },
        }
    );

    return result;
};

// U: Update
const updateOne = async (id: ObjectId, product: Product) => {
    const result = await collections.Product?.updateOne(
        { _id: id },
        { $set: { ...product } }
    );

    return result;
};

// D: Delete
const deleteOne = async (id: ObjectId) => {
    const result = await collections.Product?.deleteOne({ _id: id });

    return result;
};

const main = async () => {
    await connectDB();

    //   await createNew({
    //     name: "Apple iPad",
    //     category: "electronics",
    //     price: 60000,
    //   });

    //   const result = await deleteOne(new ObjectId("6278cf75dd48109246f941a2"));
    //   console.log("Result ", result);

    //   const result = await updateOne(new ObjectId("6278cfff7d8610bc14fdeb15"), {
    //     category: "mobile",
    //     name: "Apple iPhone",
    //     price: 45000,
    //   });
    //   console.log("Result : ", result);

    const products = await getAll();
    console.log('P : ', products);

    //   const product = await getOne(new ObjectId("6278cfff7d8610bc14fdeb15"));
    //   console.log("P ", product);
};

main();
