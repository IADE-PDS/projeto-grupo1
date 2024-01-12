// This is your test secret API key.
const stripe = require('stripe')(process.env.CHAVE_LIVE);
const express = require('express');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  const lineItems = Object.keys(cartItems).map(itemId => {
    const price = cartItems[itemId]?.preco;
    
    if (!price || isNaN(price)) {
      console.log(`Preço inválido para o item com ID: ${itemId}`);
      return null;
    }

    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: cartItems[itemId].nome,
          images: [cartItems[itemId].imagem],
        },
        unit_amount: Math.round(price * 100), // Convertendo para centavos
      },
      quantity: cartItems[itemId].quantidade,
    };
  }).filter(Boolean); // Removendo itens nulos

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://192.168.64.12:31434/checkout-sucess',
    cancel_url: 'http://192.168.64.12:31434/Carrinho',
  });

  res.send({ url: session.url });
});

module.exports = router;
