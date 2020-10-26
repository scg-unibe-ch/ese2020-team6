
import { Products, ProductsAttributes } from '../models/products.model';
import { User } from '../models/user.model';

const { Op } = require('sequelize');

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

    public updateProduct(product: ProductsAttributes): Promise<Products> {
      product.rejectionMessage = null;
      product.isAccepted = false;
      Products.update(product, {
        where: {
          productId: product.productId
        }
      });
      return Products.findOne({
        where: {
          productId: product.productId
        }
      });
    }

    public getAllUnreviewedProducts(): Promise<Array<Products>> {
      return Products.findAll({
        where: {
          isAccepted: false,
          rejectionMessage: null
        }
      });
    }

    public getMyRejectedProducts(userId: number): Promise<Array<Products>> {
      return Products.findAll({
        where: {
          userId: userId,
          isAccepted: false,
          rejectionMessage: {[Op.ne]: null}  // check if correct
        }
      });
    }

    public getMyRejectedProductsCount(userId: number): Promise <Number> {
      return Products.count({
        where: {
          userId: userId,
          isAccepted: false,
          rejectionMessage: {[Op.ne]: null}   // check if correct
        }
      });
    }

    public getUnreviewdProductsCount(): Promise <Number> {
      return Products.count({
        where: {
          isAccepted: false,
          rejectionMessage: null
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

    public acceptProduct(productId: number): Promise<Products> {
      Products.update({isAccepted: true, rejectionMessage: null}, {
        where: {
          productId: productId
        }
      });
      return Products.findOne({
        where: {
          productId: productId
        }
      });
    }

    public rejectProduct(productId: number, rejectionMessage: string): Promise<Products> {
      Products.update({isAccepted: false, rejectionMessage: rejectionMessage}, {
        where: {
          productId: productId
        }
      });
      return Products.findOne({
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
}
