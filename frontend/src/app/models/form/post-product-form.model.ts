export interface PostProductFormModel {
  title: string;
  description: string;
  offerType: string;
  productType: string;
  category: string;
  subcategory: string;
  location: string;
  picture: string;
  expirationDate: string;
  price: number;
  deliverable: boolean;
  status: string;
}

export class NullPostProductForm implements PostProductFormModel {
  title: string = null;
  description: string = null;
  offerType: string = null;
  productType: string = null;
  category: string = null;
  subcategory: string = null;
  location: string = null;
  picture: string = null;
  expirationDate: string = null;
  price: number = null;
  deliverable: boolean = null;
  status: string = null;
}
