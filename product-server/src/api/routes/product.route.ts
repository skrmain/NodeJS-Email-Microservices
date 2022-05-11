import { Router } from "express";

import {
    AddNewProductsService,
    DeleteProductsService,
    GetAllProductsService,
    GetOneProductService,
    UpdateProductsService,
} from "../services/product.service";

const router = Router();

router.post("/", AddNewProductsService);
router.get("/", GetAllProductsService);
router.get("/:id", GetOneProductService);
router.patch("/:id", UpdateProductsService);
router.delete("/:id", DeleteProductsService);

export default router;
