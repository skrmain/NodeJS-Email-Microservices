import { generateRandomText } from '../utils/common.util';
import { ProductType } from '../types/product.type';

export const Products: ProductType[] = [
    {
        Id: generateRandomText(),
        name: 'Apple iPhone',
        price: 50000,
        category: 'mobile',
        dateEdited: new Date().getTime().toString(),
    },
    {
        Id: generateRandomText(),
        name: 'Apple iPad',
        price: 80000,
        category: 'tablet',
        dateEdited: new Date().getTime().toString(),
    },
    {
        Id: generateRandomText(),
        name: 'Apple Mac Book',
        price: 150000,
        category: 'laptop',
        dateEdited: new Date().getTime().toString(),
    },
];
