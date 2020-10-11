import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { PostProductRequestBuilder } from '../../../../models/request/product/post/post-product-request-builder.interface';
import { PostProductForm } from '../../../../models/form/post-product-form.model';
import { PostProductRequest } from '../../../../models/request/product/post/post-product-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductForm> {
  requestInformation: PostProductForm;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  public onSubmit() {
    this.productService.post(this).subscribe((values) => {console.log(values); });
    this.router.navigate(['/product/buy-product']);
  }

  public build(): PostProductRequest {
    return {
      title: '',
      description: '',
      price: 0,
      offerType: '',
      productType: '',
      picture: '',
      status: ''
    };
  }

}
