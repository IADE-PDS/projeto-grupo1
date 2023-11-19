// This is your test secret API key.
const stripe = require('stripe')('sk_test_51OCXnXFqjqO9G02MprNhD1h5W9lS2xnCNd0K3zqXVQrHqpqPb3L6lbzNAQuRsOGgW21g3NM1HS7llXukbIX9OW5k00NLRdDLi0');
const express = require('express');
const router = express.Router();;

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Loengo',
              images: ["https://i.imgur.com/zCxcC6V.jpg"],
            },
            unit_amount: 200,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Oleo de Palma',
              images: ['https://i.imgur.com/g58gTBF.png']
            },
            unit_amount: 2600,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-sucess',
      cancel_url: 'http://localhost:3000/Carrinho',
    });
    res.send({url: session.url});
  });

module.exports = router