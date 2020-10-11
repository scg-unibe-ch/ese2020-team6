export interface PostProductRequest {
  title: string;
  description: string;
  price: number;
  status: string; // <- evt custom type
  picture: string; // <- custom type
  offerType: string;
  productType: string;

}
