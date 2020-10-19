export interface ProductModel {
  title: string;
  description: string;
  offerType: string;
  productType: string;
  category: string;
  subcategory: string;
  location: string;
  picture: string;
  status: string;
  workingStatus: string;
  expirationDate: string;
  createdAt: string;
  price: number;
  productId: number;
  deliverable: boolean;
}

export class NullProduct implements ProductModel {
  title: string = null;
  description: string = null;
  offerType: string = null;
  productType: string = null;
  category: string = null;
  subcategory: string = null;
  location: string = null;
  picture: string = null;
  status: string = null;
  workingStatus: string = null;
  expirationDate: string = null;
  createdAt: string = null;
  price: number = null;
  productId: number = null;
  deliverable: boolean = null;
}
