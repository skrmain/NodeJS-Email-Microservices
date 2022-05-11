import { Request, Response } from "express";
import { getManager } from "typeorm";

import { User } from "../../entity/user.entity";
import { UserSchema } from "../../schema/user.schema";
import { sendMailMessageInQueue } from "../../utils";

export const GetOneUserService = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);

    const id = req.params.id;

    const user = await userRepository.findOne(id);

    res.send({ message: "user detail", status: "success", data: user });
};

export const GetAllUsersService = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);

    const users = await userRepository.find();

    res.send({ message: "users list", status: "success", data: users });
};

export const AddNewUsersService = async (req: Request, res: Response) => {
    try {
        const userRepository = getManager().getRepository(User);

        // Add incoming data validation
        const data = req.body;
        console.log("Da ", data);
        const value: User = await UserSchema.validateAsync(data);

        const p1 = new User();

        p1.name = value.name;
        p1.email = value.email;

        const savedUser = await userRepository.save(p1);

        await sendMailMessageInQueue({
            message: `This is a test mail from ${p1.name}`,
            sender: p1.email,
        });

        res.send({
            message: "User saved",
            status: "success",
            data: savedUser,
        });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).send({
                message: "Email unavailable",
                status: "fail",
            });
        }

        if (error.name === "ValidationError" && error.isJoi) {
            return res.status(400).send({
                message: `${error.details[0].message}`,
                status: "fail",
            });
        }

        res.status(400).send({
            message: `Error`,
            status: "fail",
            data: error,
        });
    }
};

export const UpdateUserService = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);

    // Add incoming data validation
    const data = req.body;
    const id = req.params.id;

    const p1 = new User();
    console.log("Da ", data);

    if (data.name) {
        p1.name = data.name;
    }

    const savedUser = await userRepository.update(id, p1);

    res.send({
        message: "User updated",
        status: "success",
        data: savedUser,
    });
};

export const DeleteUserService = async (req: Request, res: Response) => {
    const userRepository = getManager().getRepository(User);

    const id = req.params.id;

    const savedUser = await userRepository.delete(id);

    res.send({
        message: "User deleted",
        status: "success",
        data: savedUser,
    });
};
