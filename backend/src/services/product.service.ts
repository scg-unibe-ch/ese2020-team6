
import { Product, ProductAttributes } from '../models/product.model';

const { Op } = require('sequelize');
import { AddressService } from './address.service';
import { AddressAttributes, Address } from '../models/address.model';

export class ProductService {

  private static  checkProductAttributes(product: ProductAttributes): Promise<void> {
    if (!product || Object.keys(product).length === 0) {
      return Promise.reject({ message: 'Address missing!' });
    }
    if (product.productId) {
      return Promise.reject({ message: 'Cannot set the product Id of a new product!' });
    }
    return Promise.resolve();
  }
  /*
    Creates a new product with an address.

    The method checks if the address exists or not. If the address exists, the
    product will receive the addressId of the existing address. If the address
    does not exist yet, the address will be created and assigned to the product.
  */
  public static  createProduct(product: ProductAttributes, address: AddressAttributes): Promise<Product> {
    const checkIfAddressDoesExist: Promise<number> = AddressService.addressDoesExist(address);
    product.status = 'Available';
    product.offerType = product.productType === 'Service' ? 'Rent' : product.offerType;
    product.isDeliverable = product.productType === 'Service' ? true : product.isDeliverable;
    return ProductService.checkProductAttributes(product).then(() => {
      return AddressService.checkAddressAttributes(address).then(() => {
        return checkIfAddressDoesExist.then((addressId: number) => { // address does exist -> only insert new product
          return this.insertProductWithExistingAddress(product, addressId).catch((err: any) => Promise.reject(err));
        }).catch(() => { // address does not exist -> insert product and address
          return this.insertProductAndAddress(product, address).catch((err: any) => Promise.reject(err));
        });
      }).catch((err: any) => Promise.reject(err));
    }).catch((err: any) => Promise.reject(err));

  }


  /*
    Inserts a product and a new address.
    If an address does not exist, the address will be created here, thogether with
    the product.
  */
  private static insertProductAndAddress(product: ProductAttributes, address: AddressAttributes): Promise<Product> {
    return Product.create(Object.assign(product, {address: address}), {
      include: [{
        association: Product.Address,
        include : [ Address.Products ]
      }]
    });
  }


  /*
    Inserts a product with an existing address.
    This method is helpful, if we want to insert a product without creating
    a new address (which already exists).
  */
  private static insertProductWithExistingAddress(product: ProductAttributes, addressId: number): Promise<Product> {
    return Product.create(
      Object.assign(product, {
        addressId: addressId
      })
    ).then((createdProductTmp: Product) => this.getProductById(createdProductTmp.productId))
    .catch((err: any) => Promise.reject(err));
  }

  /*
    Deletes a product. The product gets searched first and then destroyed.
    This is so the product that has been deleted can be returned and still
    be used for further interaction.
  */
  public static deleteProduct(productId: number, userId: number): Promise<Product> {
    return this.getProductById(productId).then((product: Product) => {
      if (product.userId === userId) {
        return Product.destroy({
          where: {
            productId: productId
          }
        }).then(() => {
          return Promise.resolve(product);
        }).catch((err: any) => Promise.reject(err));
      } else {
        return Promise.reject({ message: 'Not authorized!' });
      }
    }).catch((err: any) => Promise.reject(err));
  }

  /*
    Updates the product with the given address. If the address already
    exists, the addressId of the existing address will be set to the
    product addressId. If the updated address does not exist yet, the
    address will be inserted into the addresses table and the addressId
    will of the created address will be set to the product addressId.

    Therefore if the address changes, the method will search for an
    existing address. If found, the existing one will be uses. If not,
    a new address will be created. Therefore it works if the address
    is not updated.

    The product update process is normal and fairly easy.
  */
  public static updateProduct(product: ProductAttributes, address: AddressAttributes): Promise<Product> {
    product.rejectionMessage = null;
    product.isAccepted = false;

    const checkIfAddressDoesExist: Promise<number> = AddressService.addressDoesExist(address);

    return checkIfAddressDoesExist.then((addressId: number) => {
      product.addressId = addressId;
      return this.updateOnlyProduct(product);
    }).catch(() => {
      return AddressService.createAddress(address).then((createdAddress: Address) => {
        product.addressId = createdAddress.addressId;
        return this.updateOnlyProduct(product);
      });
    });
  }

  /*
    Updates only the product. The address of the product will not be updated
    here, but in the method updateProduct. This method only updated the
    product attributes.
  */
  private static updateOnlyProduct(product: ProductAttributes): Promise<Product> {
    Product.update(product, {
      where: {
        productId: product.productId
      }
    });
    return this.getProductById(product.productId);
  }

  /*
    Accept a product. This method is called if an admin accepts a product.
    The isAccepted flag of the product gets set to true and the rejectionMessage
    gets set to null. This combination tells us that the product has been
    accepted.

    The method then returns the accepted product as a Promise.
  */
  public static acceptProduct(productId: number): Promise<Product> {
    Product.update({ isAccepted: true, rejectionMessage: null }, {
      where: {
        productId: productId
      }
    });
    return this.getProductById(productId);
  }


  /*
    Rejects a product. This method is called if an admin rejects a product.
    The isAccepted flag gets set to false and the rejectionMessage gets set
    to a specified message of the admin.

    The method then returns the rejected product as a Promise.
  */
  public static rejectProduct(productId: number, rejectionMessage: string): Promise<Product> {
    Product.update({ isAccepted: false, rejectionMessage: rejectionMessage }, {
      where: {
        productId: productId
      }
    });
    return this.getProductById(productId);
  }

  /************************************************
    Getters
  ************************************************/

  public static getAllProducts(): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({});
  }

  public static getAllUnreviewedProducts(): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      isAccepted: false,
      rejectionMessage: null
    });
  }

  public static getMyRejectedProducts(userId: number): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      userId: userId,
      isAccepted: false,
      rejectionMessage: { [Op.ne]: null }
    });
  }

  public static getMyRejectedProductsCount(userId: number): Promise<Number> {
    return Product.count({
      where: {
        userId: userId,
        isAccepted: false,
        rejectionMessage: { [Op.ne]: null }
      }
    });
  }

  public static getUnreviewdProductsCount(): Promise<Number> {
    return Product.count({
      where: {
        isAccepted: false,
        rejectionMessage: null
      }
    });
  }

  public static getAllAcceptedProducts(): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      isAccepted: true
    });
  }

  public static getMyProducts(userId: number): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      userId: userId
    });
  }

  public static getProductById(productId: number): Promise<Product> {
    return this.getProductByAllAttributes({
      productId: productId
    });
  }

  /*
    Getter helper methods
  */

  private static getProductByEitherAttributes(attributes: Object): Promise<Product> {
    return this.getProductByAttributes(attributes, Op.or);
  }

  private static getProductByAllAttributes(attributes: Object): Promise<Product> {
    return this.getProductByAttributes(attributes, Op.and);
  }

  private static getProductByAttributes(attributes: Object, operator: any): Promise<Product> {
    return Product.findOne(this.buildWhereOperator(attributes, operator));
  }

  private static getProductsByEitherAttributes(attributes: Object): Promise<Array<Product>> {
    return this.getProductsByAttributes(attributes, Op.or);
  }

  private static getProductsByAllAttributes(attributes: Object): Promise<Array<Product>> {
    return this.getProductsByAttributes(attributes, Op.and);
  }

  private static getProductsByAttributes(attributes: Object, operator: any): Promise<Array<Product>> {
    return Product.findAll(this.buildWhereOperator(attributes, operator));
  }

  private static buildWhereOperator(attributes: Object, operator: any): Object {
    const where: Array<Object> = Object.entries(attributes).map(([key, value]) => {
      return {
        [key]: value
      };
    });

    return {
      where: {
        [operator]: where
      },
      include: [{
        association: Product.Address
      }]
    };
  }
}
