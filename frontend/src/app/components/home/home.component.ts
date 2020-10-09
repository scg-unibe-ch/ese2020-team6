import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    private httpClient: HttpClient
  ) { }

  buy() {
    this.httpClient.get(environment.endpointURL + 'secured/buy').subscribe((res: any) => {
      this.buyMessage = res.message;
    }, (error: any) => {
      this.buyMessage = "You need to login to use this feature!";
    });
  }

  post() {
    this.httpClient.get(environment.endpointURL + 'secured/post').subscribe((res: any) => {
      this.buyMessage = res.message;
    }, (error: any) => {
      this.buyMessage = "You need to login to use this feature!";
    });
  }

  approve() {
    this.approveMessage = "Not implemented yet!"
  }
}
