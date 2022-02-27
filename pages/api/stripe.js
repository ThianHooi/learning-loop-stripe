const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const DEFAULT_ERROR_MSG = "Something went wrog. Try again later.";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const paymentLinks = await stripe.paymentLinks
        .list({
          active: true,
          expand: ["data.line_items.data"],
        })
        .then(
          (result) => res.status(200).json(result),
          (err) =>
            res.status(400).json({
              error: err.message || DEFAULT_ERROR_MSG,
              type: err.type || "Error",
            })
        );

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
