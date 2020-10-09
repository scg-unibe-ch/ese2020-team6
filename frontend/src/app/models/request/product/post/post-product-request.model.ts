export interface PostProductRequest {
  title: string;
  description: string;
  price: number;
  category: string; // <- evt custom type
  picture: string; // <- custom type
}
