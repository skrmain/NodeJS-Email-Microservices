import { AppDataSource } from "./data-source";
import { Product } from "./entity/Product";
import { User } from "./entity/User";

const productRepository = AppDataSource.getRepository(Product);

const addNewProduct = async (product: Product) => {
    return await productRepository.save(product);
};

const getProducts = async () => {
    return await productRepository.find();
};

const getProduct = async (id: number) => {
    return await productRepository.findOneBy({ id });
};

const updateProduct = async (id: number, product: Product) => {
    return await productRepository.update(id, product);
};

const deleteProduct = async (id: number) => {
    return await productRepository.delete({ id });
};

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log("DB Connected");

        // // C - Create
        // const p1 = new Product();
        // p1.name = "Apple iPhone";
        // p1.price = 50000;
        // p1.category = "electronics";

        // const result = await addNewProduct(p1);
        // console.log("Re ", result);

        // R - Read
        const products = await getProducts();
        console.log("P ", products);

        // const product = await getProduct(1);
        // console.log("P ", product);

        // // U - Update
        // const p2 = new Product();
        // p2.category = "mobile";

        // const result = await updateProduct(1, p2);
        // console.log("Re ", result);

        // // D - Delete
        // const result = await deleteProduct(1);
        // console.log("Re ", result);
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy();
        console.log("DB Collection closed");
    }
};

main();

// console.log("Inserting a new user into the database...");
// const user = new User();
// user.firstName = "Timber";
// user.lastName = "Saw";
// user.age = 25;
// await AppDataSource.manager.save(user);
// console.log("Saved a new user with id: " + user.id);

// console.log("Loading users from the database...");
// const users = await AppDataSource.manager.find(User);
// console.log("Loaded users: ", users);
