import { ProductModel } from '../../../product/product.model';

export interface PostProductRequestModel extends Omit<ProductModel, 'productId | userId | rejectionMessage'>{}
