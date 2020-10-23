export interface PostProductFormModel {
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
  isDeliverable: string;
}

export class NullPostProductForm implements PostProductFormModel {
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
  isDeliverable: string = null;
}
