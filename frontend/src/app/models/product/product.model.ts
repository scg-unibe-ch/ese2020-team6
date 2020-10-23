export interface ProductModel {
  productId: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  productType: string;
  offerType: string;
  picture: string;
  subcategory: string;
  expirationDate: number;
  status: string;
  userId: number;
  rejectionMessage: string;
  isDeliverable: boolean;
}

export class NullProduct implements ProductModel {
  productId: number = null;
  title: string = null;
  description: string = null;
  price: number = null;
  category: string = null;
  location: string = null;
  productType: string = null;
  offerType: string = null;
  picture: string = null;
  subcategory: string = null;
  expirationDate: number = null;
  status: string = null;
  userId: number = null;
  rejectionMessage: string = null;
  isDeliverable: boolean = null;
}
