const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUqpFgB4xKW02ZNqKi6i-aGL-AfY63s60Aa7yf5PG__ZBYTTnp6lCYB_gPb743Gj97gne2kxwEi14abu',
  'client_secret': 'EM67D3UA3WBcpmiiJSUbbZK1bxkKgqBTEAr-KnJEDv3GOul3OnnB5lu4_vQ1aXu-uxJE3p0dlecJdxau'
});


const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));


app.listen(PORT, () => console.log(`Server Started on ${PORT}`));