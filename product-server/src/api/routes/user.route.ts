import { Router } from "express";

import {
    AddNewUsersService,
    DeleteUserService,
    GetAllUsersService,
    GetOneUserService,
    UpdateUserService,
} from "../services/user.service";

const router = Router();

router.post("/", AddNewUsersService);
router.get("/", GetAllUsersService);
router.get("/:id", GetOneUserService);
router.patch("/:id", UpdateUserService);
router.delete("/:id", DeleteUserService);

export default router;
