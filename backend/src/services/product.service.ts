
import { Product, ProductAttributes } from '../models/product.model';

const { Op } = require('sequelize');

export class ProductService {

    public createProduct(product: ProductAttributes): Promise<ProductAttributes> {
        return Product.create(product).then(
            inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public getAllProducts(): Promise<Product[]> {
        return Product.findAll();
    }

    public getProductById(productId: number): Promise<Product> {
        return Product.findOne({
          where: {
            productId: productId
          }
        });
    }

    public deleteProduct(productId: number): Promise<Product> {
        const product: Promise<Product> = Product.findOne({
            where: {
              productId: productId
            }
          });
        Product.destroy({
          where: {
            productId: productId
          }
        });
        return product;
    }

    public updateProduct(product: ProductAttributes): Promise<Product> {
      product.rejectionMessage = null;
      product.isAccepted = false;
      Product.update(product, {
        where: {
          productId: product.productId
        }
      });
      return Product.findOne({
        where: {
          productId: product.productId
        }
      });
    }

    public getAllUnreviewedProducts(): Promise<Array<Product>> {
      return Product.findAll({
        where: {
          isAccepted: false,
          rejectionMessage: null
        }
      });
    }

    public getMyRejectedProducts(userId: number): Promise<Array<Product>> {
      return Product.findAll({
        where: {
          userId: userId,
          isAccepted: false,
          rejectionMessage: {[Op.ne]: null}
        }
      });
    }

    public getMyRejectedProductsCount(userId: number): Promise <Number> {
      return Product.count({
        where: {
          userId: userId,
          isAccepted: false,
          rejectionMessage: {[Op.ne]: null}
        }
      });
    }

    public getUnreviewdProductsCount(): Promise <Number> {
      return Product.count({
        where: {
          isAccepted: false,
          rejectionMessage: null
        }
      });
    }

    public getAllAcceptedProducts(): Promise<Array<Product>> {
      return Product.findAll({
        where: {
          isAccepted: true
        }
      });
    }

    public acceptProduct(productId: number): Promise<Product> {
      Product.update({isAccepted: true, rejectionMessage: null}, {
        where: {
          productId: productId
        }
      });
      return Product.findOne({
        where: {
          productId: productId
        }
      });
    }

    public rejectProduct(productId: number, rejectionMessage: string): Promise<Product> {
      Product.update({isAccepted: false, rejectionMessage: rejectionMessage}, {
        where: {
          productId: productId
        }
      });
      return Product.findOne({
        where: {
          productId: productId
        }
      });
    }

    public getMyProducts(userId: number): Promise<Array<Product>> {
      return Product.findAll({
        where: {
            userId: userId
        }
      });
    }
}
