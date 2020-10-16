
import { Products, ProductsAttributes } from '../models/products.model';

export class ProductService {

    public create(product: ProductsAttributes): Promise<ProductsAttributes> {
        return Products.create(product).then(
            inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public getAll(): Promise<Products[]> {
        return Products.findAll();
    }

    public get(id: number): Promise<Products> {
        return Products.findOne({
          where: {
            productId: id
          }
        });
    }

    public getMyProducts(id: number): Promise<Products> {
        return Products.findOne({
          where: {
            userId: id
          }
        });
    }
}
