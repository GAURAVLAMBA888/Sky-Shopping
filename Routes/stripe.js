const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: req.body.products.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
              images: [item.img],
              description: item.desc,
              metadata: {
                id: item._id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success?success=${process.env.SUCCESS_KEY}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
