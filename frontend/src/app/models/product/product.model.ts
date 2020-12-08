import { NullAddress, Address } from '../map/address/address.model';
import { environment } from 'src/environments/environment';
import { Is } from '../compare/is';
import { CutUser, NullCutUser } from '../user/cut-user.model';
import { ProductResponseModel } from '../response/response.module';

export interface ProductModel {
  productId: number;
  sellerId: number;
  seller: CutUser;
  productType: string;
  offerType: string;
  title: string;
  description: string;
  price: number;
  address: Address;
  picture: string;
  category: string;
  subcategory: string;
  isDeliverable: boolean;
  expirationDate: Date;
  status: string;
  rejectionMessage: string;
}

export class Product implements ProductModel {

  private static expDateFormatOptions: Intl.DateTimeFormatOptions = {
    localeMatcher: 'lookup',
    day: 'numeric', month: 'long', year: 'numeric'
  }
  private static expDateFormat = new Intl.DateTimeFormat('de-CH', Product.expDateFormatOptions);

  constructor(
    public productId: number,
    public sellerId: number,
    public seller: CutUser,
    public productType: string,
    public offerType: string,
    public title: string,
    public description: string,
    public price: number,
    public address: Address,
    public picture: string,
    public category: string,
    public subcategory: string,
    public isDeliverable: boolean,
    public expirationDate: Date,
    public status: string,
    public rejectionMessage: string
  ) { }


  get pictureUrl(): string {
    if (this.picture) return environment.endpointURL + this.picture;
    else return undefined;
  }

  get fromatExpirationDate(): string {
    return Product.expDateFormat.format(this.expirationDate).split(',').join('');
  }

  get isExpired(): boolean {
    return new Date().getTime() > this.expirationDate.getTime();
  }

  public toString = () : string => {
    return this.title;
  }

  public static buildFromProductModel(product: ProductModel): Product {
    return new Product (
      product.productId,
      product.sellerId,
      CutUser.buildFromCutUserModel(product.seller),
      product.productType,
      product.offerType,
      product.title,
      product.description,
      product.price,
      Address.buildFromAddressModel(product.address),
      product.picture,
      product.category,
      product.subcategory,
      product.isDeliverable,
      product.expirationDate,
      product.status,
      product.rejectionMessage
    )
  }

  static isProductModel(product: ProductModel): product is ProductModel {
    return Is.is(product, [
      'productId', 'sellerId', 'productType', 'expirationDate',
      'offerType', 'title', 'description', 'category', 'subcategory',
      'price', 'picture', 'isDeliverable', 'status'
    ]) && Address.isAddressModel(product.address)
    && CutUser.isCutUserModel(product.seller);
  }

  static buildFromProductResponseModel(product: ProductResponseModel): Product {
    return new Product (
      product.productId,
      product.sellerId,
      CutUser.buildFromCutUserResponseModel(product.seller),
      product.productType,
      product.offerType,
      product.title,
      product.description,
      product.price,
      Address.buildFromAddressResponseModel(product.address),
      product.picture,
      product.category,
      product.subcategory,
      product.isDeliverable,
      new Date(product.expirationDate),
      product.status,
      product.rejectionMessage
    )
  }
}

export class NullProduct extends Product {
  private static _instance: NullProduct;

  constructor() {
    super(null, null, NullCutUser.instance(), null, null, null, null, null, NullAddress.instance(), null, null, null, null, new Date(), null, null);
  }

  public static instance(): NullProduct {
    if (!NullProduct._instance) NullProduct._instance = new NullProduct();
    return NullProduct._instance;
  }

}
