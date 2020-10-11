import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Products, ProductsAttributes } from '../models/products.model';

export class ProductService {

    public post(Products: ProductsAttributes): Promise<ProductsAttributes> {
       
        return Products.create(Products).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err)); //not working
    }

    public getAll(): Promise<Products[]> {
        return Products.findAll();
    }
}
