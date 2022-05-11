import Joi from "joi";

import { UserRole } from "../entity/user.entity";

export const UserSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    role: Joi.string().valid(UserRole),
});
