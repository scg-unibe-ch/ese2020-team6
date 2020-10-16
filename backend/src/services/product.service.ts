
import { Products, ProductsAttributes } from '../models/products.model';

export class ProductService {
    product: any;

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

    public delete(id: number): Promise<Products> {
        this.product = Products.findOne({
            where: {
              productId: id
            }
          });
        Products.destroy({
          where: {
            productId: id
          }
        });
        return this.product;
    }
}
