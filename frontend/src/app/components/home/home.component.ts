import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  buyMessage: String;
  postMessage: String;
  approveMessage: String;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  post(): any {
    this.httpClient.get(environment.endpointURL + 'secured/post').subscribe((res: any) => {
      this.router.navigate(['/product/post']);
    }, (error: any) => {
      this.postMessage = 'You need to login to use this feature!';
    });
  }

  approve() {
    this.approveMessage = 'Not implemented yet!'
  }
}
