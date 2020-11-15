import { ProductModel } from '../../../product/product.model';

export interface UpdateProductRequestModel extends Omit<ProductModel, 'userId | rejectionMessage'>{}
