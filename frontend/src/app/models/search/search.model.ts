import { Product } from 'src/app/models/product/product.model';

export interface SearchModel {
    titleAndDescription: string;
    categories: Array<string>;
    subcategories: Array<string>;
    location: string;
    productType: string;
    offerType: string;
    priceMin: number;
    priceMax: number;
    deliverable: boolean;
    status: string;
}

export class Search implements SearchModel {
    public titleAndDescription: string = '';
    public categories: Array<string> = new Array<string>();
    public subcategories: Array<string> = new Array<string>();
    public location: string = '';
    public productType: string = '';
    public offerType: string = '';
    public priceMin: number = 0;
    public priceMax: number = 3000;
    public deliverable: boolean = null;
    public status: string = '';

    public filter(product: Product): boolean {
      if (!this.productHasCategory(product)) return false;
      else if (!this.productHasSubCategory(product)) return false;
      else if (!this.productIsInPriceRange(product)) return false;
      else if (!this.productHasDeliverableStatus(product)) return false;
      else if (!this.productHasProductType(product)) return false;
      else if (!this.productHasOfferType(product)) return false;
      else if (!this.productHasStatus(product)) return false;
      else if (!this.keywordInTitleOrDescription(product)) return false;
      else if (!this.keywordInAddress(product)) return false;
      else return true;
    }

    private productHasCategory(product: Product): boolean {
      if (this.categories.length > 0) return this.categories.includes(product.category.toString());
      else return true;
    }

    private productHasSubCategory(product: Product): boolean {
      if (this.subcategories.length > 0) return this.subcategories.includes(product.subcategory);
      else return true;
    }

    private productIsInPriceRange(product: Product): boolean {
      return this.priceMin <= product.price && product.price <= this.priceMax;
    }

    private productHasDeliverableStatus(product: Product): boolean {
      if (this.deliverable) return this.deliverable == product.isDeliverable;
      else return true;
    }

    private productHasProductType(product: Product): boolean {
      return Search.stringContainsKeyword(product.productType, this.productType);
    }

    private productHasOfferType(product: Product): boolean {
      return Search.stringContainsKeyword(product.offerType, this.offerType);
    }

    private productHasStatus(product: Product): boolean {
      return Search.stringContainsKeyword(product.status, this.status);
    }

    private keywordInTitleOrDescription(product: Product): boolean {
      let keywordInTitle: boolean = Search.stringContainsKeyword(product.title, this.titleAndDescription);
      let keywordInDescription: boolean = Search.stringContainsKeyword(product.description, this.titleAndDescription);
      return keywordInTitle || keywordInDescription;
    }

    private keywordInAddress(product: Product): boolean {
      return Search.stringContainsKeyword(product.address.toString(), this.location)
    }

    private static stringContainsKeyword(string: string, keyword: string): boolean {
      let lowerCaseString: string = string.toLocaleLowerCase();
      let lowerCaseKeyword: string = keyword.toLocaleLowerCase();
      return lowerCaseString.indexOf(lowerCaseKeyword) >= 0;
    }
}
