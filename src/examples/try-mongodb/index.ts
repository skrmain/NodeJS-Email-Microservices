import { MONGODB_URI } from '../../config';
import { Database } from '../../shared/mongodb.utils';

const main = async () => {
    try {
        await Database.connect(MONGODB_URI, 'test2');
        console.log('DB Connected');

        const userService = (await import('./user.service')).default;

        const createdUser = await userService.createOne({
            name: 'Rahul',
            email: 'rahul@example.com',
            isEmailVerified: false,
        });
        console.log({ createdUser });

        const users = await userService.getMany();
        console.log({ users });

        const user = await userService.getOne();
        console.log({ user });

        if (user) {
            const updatedResult = await userService.updateOne(user._id, { name: 'Raj' });
            console.log({ updatedResult });

            const deletedResult = await userService.deleteOne(user._id);
            console.log({ deletedResult });
        }
    } catch (error) {
        console.log({ error });
    } finally {
        await Database.disconnect();
    }
};

main();
