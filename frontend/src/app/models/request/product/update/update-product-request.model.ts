export interface UpdateProductRequestModel {
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
  isDeliverable: boolean;
}
