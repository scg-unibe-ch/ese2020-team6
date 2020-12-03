import { Transaction, Op } from 'sequelize';
import { Product, ProductAttributes, ProductCreationAttributes } from '../models/product.model';
import { Address, AddressAttributes } from '../models/address.model';
import { AddressService } from './address.service';
import { CO } from '../interfaces/orders.interface';

import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { UserAttributes } from '../models/user.model';
import { UserIsNotSellerError, UserIsSellerError } from '../errors/user-seller.error';

interface HasProductId extends Partial<ProductAttributes> {
  productId: number;
}

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
    const checkIfAddressDoesExist: Promise<Address> = AddressService.addressDoesExist(address);
    product.status = 'Available';
    product.offerType = product.productType === 'Service' ? 'Rent' : product.offerType;
    product.isDeliverable = product.productType === 'Service' ? true : product.isDeliverable;
    return ProductService.checkProductAttributes(product).then(() => {
      return AddressService.checkAddressAttributes(address).then(() => {
        return checkIfAddressDoesExist.then((existingAddress: Address) => { // address does exist -> only insert new product
          return this.insertProductWithExistingAddress(
            product, existingAddress.addressId)
            .catch((err: any) => Promise.reject(err));
        }).catch(() => { // address does not exist -> insert product and address
          return this.insertProductAndAddress(product, address).catch((err: any) => Promise.reject(err));
        });
      });
    });

  }


  /*
    Inserts a product and a new address.
    If an address does not exist, the address will be created here, thogether with
    the product.
  */
  private static insertProductAndAddress(product: ProductAttributes, address: AddressAttributes): Promise<Product> {
    return Product.create(Object.assign(product, {address: address}), {
      include: [{
        association: Product.associations.address,
        include : [ Address.associations.products ]
      }]
    }).catch((err: any) => {console.log(err); return Promise.reject(err); });
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
  public static deleteProduct(productId: number, sellerId: number): Promise<Product> {
    return this.getProductById(productId).then((product: Product) => {
      if (product.sellerId === sellerId) {
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
  public static updateProduct(userId: number, product: ProductAttributes, address: AddressAttributes): Promise<Product> {
    product.rejectionMessage = null;
    product.isAccepted = false;
    console.log(product, 'ok till heeeeeeeeereeeeeeeeeeeeee');
    return this.isUserSeller(userId, product)
    .then(() => AddressService.addressDoesExist(address))
    .then((existingAddress: Address) => {
      console.log(product, 'Prooooooduuuuuuuuccccccccccccttttttttttttttt');
      product.addressId = existingAddress.addressId;
      return this.updateOnlyProduct(product).then(() => {
        return this.getProductById(product.productId);
      }).catch((err: any) => Promise.reject(err));
    }).catch(() => {
      return AddressService.createAddress(address).then((createdAddress: Address) => {
        product.addressId = createdAddress.addressId;
        return this.updateOnlyProduct(product).then(() => {
          return this.getProductById(product.productId);
        }).catch((err: any) => Promise.reject(err));
      });
    });
  }

  /*
    Checks if a user is the seller of the product.

    The method compares the sellerId of the product with the userId of the user
    and returns a resolved promise if they are the same. And a rejected Product
    if they are not the same.
  */
  private static isUserSeller(userId: number, product: ProductAttributes): Promise<void> {
    console.log(product, '++++++++++++isUserSeller works!!!!!!!!!!!!');
    console.log(userId, 'USER-ID');
    console.log(product.sellerId, 'SELLER-ID');
    // if (userId === product.sellerId) {
      console.log('isUserSeller works111111111111111');
      return Promise.resolve(); // } else {
      //   console.log('isUserSeller works222222222222222');
      //   return Promise.reject(new UserIsNotSellerError(product)); }
  }

  /*
    Checks if a user is not the seller of the product.

    The method inverts the promise returned from isUserSeller and returns a new promise.
  */
  private static isUserNotSeller(userId: number, product: ProductAttributes): Promise<void> {
    return this.isUserSeller(userId, product)
    .then(() => Promise.reject(new UserIsSellerError(product)))
    .catch((error: any) => {
      if (error instanceof UserIsNotSellerError) {
        return Promise.resolve();
      } else {
        return Promise.reject(error);
      }
    });
  }


  /*
    Updates only the product. The address of the product will not be updated
    here, but in the method updateProduct. This method only updated the
    product attributes.
  */
  private static updateOnlyProduct(product: HasProductId): Promise<void> {
    return Product.update(product, {
      where: {
        productId: product.productId
      }
    }).then(() => Promise.resolve()).catch((err: any) => Promise.reject(err));
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

  public static setStatus(checkedOrder: CO, transaction?: Transaction): Promise<Product> {
    return checkedOrder.product.update(
      { status: checkedOrder.product.purchasedStatus },
      { transaction: transaction }
    );
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

  public static getMyRejectedProducts(sellerId: number): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      sellerId: sellerId,
      isAccepted: false,
      rejectionMessage: { [Op.ne]: null }
    });
  }

  public static getMyRejectedProductsCount(sellerId: number): Promise<Number> {
    return Product.count({
      where: {
        sellerId: sellerId,
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
      isAccepted: true,
      status: 'Available'
    });
  }

  public static getMyProducts(sellerId: number): Promise<Array<Product>> {
    return this.getProductsByAllAttributes({
      sellerId: sellerId
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
      include: [Product.associations.address]
    };
  }

  public static productDoesExist(product: Partial<ProductAttributes>, transaction?: Transaction): Promise<Product> {
    return Product.findOne({
      where: product,
      rejectOnEmpty: new InstanceDoesNotExistError(Product.getTableName()),
      transaction: transaction
    });
  }

  public static findOrCreate(product: ProductCreationAttributes, transaction?: Transaction): Promise<Product> {
    return this.productDoesExist(product, transaction).catch((err: any) => {
      if (err instanceof InstanceDoesNotExistError) {
        return Product.create(product, { transaction: transaction });
      } else {
        return Promise.reject(err);
      }
    });
  }
}
