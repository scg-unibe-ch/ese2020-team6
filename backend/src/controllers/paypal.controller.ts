import { ProductsAttributes } from '../models/products.model';

const PORT = process.env.PORT || 3000;

const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': 'AUqpFgB4xKW02ZNqKi6i-aGL-AfY63s60Aa7yf5PG__ZBYTTnp6lCYB_gPb743Gj97gne2kxwEi14abu',
  'client_secret': 'EM67D3UA3WBcpmiiJSUbbZK1bxkKgqBTEAr-KnJEDv3GOul3OnnB5lu4_vQ1aXu-uxJE3p0dlecJdxau'
});


const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "CHF",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "CHF",
              "total": "25.00"
          },
          "description": "Test description"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
