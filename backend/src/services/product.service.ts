
import { Products, ProductsAttributes } from '../models/products.model';

export class ProductService {

    public create(product: ProductsAttributes): Promise<ProductsAttributes> {
        return Products.create(product).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err)); // not working
    }

    public getAll(): Promise<Products[]> {
        return Products.findAll();
    }
}
