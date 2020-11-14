import { Products, ProductsAttributes } from '../models/products.model';
const { Op } = require('sequelize');
import { AddressService } from './address.service';
import { AddressAttributes, Address } from '../models/address.model';

export class ProductService {
  /*
    Creates a new product with an address.

    The method checks if the address exists or not. If the address exists, the
    product will receive the addressId of the existing address. If the address
    does not exist yet, the address will be created and assigned to the product.
  */
  public createProduct(product: ProductsAttributes, address: AddressAttributes): Promise<Products> {
    const checkIfAddressDoesExist: Promise<number> = AddressService.addressDoesExist(address);

    return checkIfAddressDoesExist.then((addressId: number) => { // address does exist -> only insert new product
      return this.insertProductWithExistingAddress(product, addressId);
    }).catch(() => { // address does not exist -> insert product and address
      return this.insertProductAndAddress(product, address);
    });
  }

  /*
    Inserts a product and a new address.
    If an address does not exist, the address will be created here, thogether with
    the product.
  */
  private insertProductAndAddress(product: ProductsAttributes, address: AddressAttributes): Promise<Products> {
    return Products.create(
      Object.assign(product, {address: address}),
      {
        include: [{
          association: Products.Address,
          include : [ Address.Products ]
        }]
      }
    ).then((createdProduct: Products) => Promise.resolve(createdProduct))
    .catch(err => Promise.reject(err));
  }


  /*
    Inserts a product with an existing address.
    This method is helpful, if we want to insert a product without creating
    a new address (which already exists).
  */
  private insertProductWithExistingAddress(product: ProductsAttributes, addressId: number): Promise<Products> {
    return Products.create(
      Object.assign(product, {
        addressId: addressId
      })
    ).then((createdProductTmp: Products) => this.getProductById(createdProductTmp.productId))
    .catch(err => Promise.reject(err));
  }

  /*
    Deletes a product. The product gets searched first and then destroyed.
    This is so the product that has been deleted can be returned and still
    be used for further interaction.
  */
  public deleteProduct(productId: number, userId: number): Promise<Products> {
    return this.getProductById(productId).then((product: Products) => {
      if (product.userId === userId) {
        return Products.destroy({
          where: {
            productId: productId
          }
        }).then(() => {
          return Promise.resolve(product);
        }).catch(err => Promise.reject(err));
      } else {
        return Promise.reject({ message: 'Not authorized!' });
      }
    }).catch(err => Promise.reject(err));
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
  public updateProduct(product: ProductsAttributes, address: AddressAttributes): Promise<Products> {
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
  private updateOnlyProduct(product: ProductsAttributes): Promise<Products> {
    Products.update(product, {
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
  public acceptProduct(productId: number): Promise<Products> {
    Products.update({ isAccepted: true, rejectionMessage: null }, {
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
  public rejectProduct(productId: number, rejectionMessage: string): Promise<Products> {
    Products.update({ isAccepted: false, rejectionMessage: rejectionMessage }, {
      where: {
        productId: productId
      }
    });
    return this.getProductById(productId);
  }

  /************************************************
    Getters
  ************************************************/

  public getAllProducts(): Promise<Array<Products>> {
    return this.getProductsByAllAttributes({});
  }

  public getAllUnreviewedProducts(): Promise<Array<Products>> {
    return this.getProductsByAllAttributes({
      isAccepted: false,
      rejectionMessage: null
    });
  }

  public getMyRejectedProducts(userId: number): Promise<Array<Products>> {
    return this.getProductsByAllAttributes({
      userId: userId,
      isAccepted: false,
      rejectionMessage: { [Op.ne]: null }
    });
  }

  public getMyRejectedProductsCount(userId: number): Promise<Number> {
    return Products.count({
      where: {
        userId: userId,
        isAccepted: false,
        rejectionMessage: { [Op.ne]: null }
      }
    });
  }

  public getUnreviewdProductsCount(): Promise<Number> {
    return Products.count({
      where: {
        isAccepted: false,
        rejectionMessage: null
      }
    });
  }

  public getAllAcceptedProducts(): Promise<Array<Products>> {
    return this.getProductsByAllAttributes({
      isAccepted: true
    });
  }

  public getMyProducts(userId: number): Promise<Array<Products>> {
    return this.getProductsByAllAttributes({
      userId: userId
    });
  }

  public getProductById(productId: number): Promise<Products> {
    return this.getProductByAllAttributes({
      productId: productId
    });
  }

  /*
    Getter helper methods
  */

  private getProductByEitherAttributes(attributes: Object): Promise<Products> {
    return this.getProductByAttributes(attributes, Op.or);
  }

  private getProductByAllAttributes(attributes: Object): Promise<Products> {
    return this.getProductByAttributes(attributes, Op.and);
  }

  private getProductByAttributes(attributes: Object, operator: any): Promise<Products> {
    return Products.findOne(this.buildWhereOperator(attributes, operator));
  }

  private getProductsByEitherAttributes(attributes: Object): Promise<Array<Products>> {
    return this.getProductsByAttributes(attributes, Op.or);
  }

  private getProductsByAllAttributes(attributes: Object): Promise<Array<Products>> {
    return this.getProductsByAttributes(attributes, Op.and);
  }

  private getProductsByAttributes(attributes: Object, operator: any): Promise<Array<Products>> {
    return Products.findAll(this.buildWhereOperator(attributes, operator));
  }

  private buildWhereOperator(attributes: Object, operator: any): Object {
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
        association: Products.Address
      }]
    };
  }
}
