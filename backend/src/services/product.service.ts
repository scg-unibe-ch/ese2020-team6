
import { Products, ProductsAttributes } from '../models/products.model';
import { User } from '../models/user.model';

export class ProductService {

    public createProduct(product: ProductsAttributes): Promise<ProductsAttributes> {
        return Products.create(product).then(
            inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public getAllProducts(): Promise<Products[]> {
        return Products.findAll();
    }

    public getProductById(productId: number): Promise<Products> {
        return Products.findOne({
          where: {
            productId: productId
          }
        });
    }

    public deleteProduct(productId: number): Promise<Products> {
        const product: Promise<Products> = Products.findOne({
            where: {
              productId: productId
            }
          });
        Products.destroy({
          where: {
            productId: productId
          }
        });
        return product;
    }

    public updateProduct(product: ProductsAttributes): Promise<[number, Array<Products>]> {
      return Products.update(product, {
        where: {
          productId: product.productId
        }
      });
    }

    public getAllUnreviewedProducts(): Promise<Array<Products>> {
      return Products.findAll({
        where: {
          isAccepted: false
        }
      });
    }

    public getAllAcceptedProducts(): Promise<Array<Products>> {
      return Products.findAll({
        where: {
          isAccepted: true
        }
      });
    }

    public acceptProduct(productId: number): Promise<[number, Array<Products>]> {
      return Products.update({isAccepted: true, rejectionMessage: null}, {
        where: {
          productId: productId
        }
      });
    }

    public rejectProduct(productId: number, rejectionMessage: string): Promise<[number, Array<Products>]> {
      return Products.update({rejectionMessage: rejectionMessage}, {
        where: {
          productId: productId
        }
      });
    }

    public getMyProducts(userId: number): Promise<Array<Products>> {
      return Products.findAll({
        where: {
            userId: userId
        }
      });
    }

    public accept(productId: number): Promise<[number, Products[]]> {
      return Products.update({ accepted: true, rejectionMessage: null }, {
        where: {
          productId: productId
        }
      });
    }

    public reject(productId: number, rejectionMessage: string): Promise<[number, Products[]]> {
      return Products.update({ accepted: false, rejectionMessage: rejectionMessage}, {
        where: {
          productId: productId
        }
      });
    }
}
