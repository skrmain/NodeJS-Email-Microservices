import { MONGODB_URI } from '../../config';
import database from './mongodb.utils';

const main = async () => {
    try {
        await database.connect(MONGODB_URI, 'test2');
        console.log('DB Connected');

        const userService = (await import('./user.service')).default;

        await userService.createOne({
            name: 'Rahul',
            email: 'rahul@example.com',
            isEmailVerified: false,
        });
        console.log('IN');

        const users = await userService.getMany();
        console.log('OUT', users);

        const user = await userService.getOne();
        console.log('OUT', user);
    } catch (error) {
        console.log('Er ', error);
    }
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

    // const products = await getAll();
    // console.log('P : ', products);

    //   const product = await getOne(new ObjectId("6278cfff7d8610bc14fdeb15"));
    //   console.log("P ", product);
};

main();
