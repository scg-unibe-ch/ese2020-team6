export interface PostProductRequestModel {
  title: string;
  description: string;
  price: number;
  status: string; // <- evt custom type
  picture: string; // <- custom type
  offerType: string;
  productType: string;
  category: string;
  location: string;
  userId: number;
  productId: number;

}
