import nc from "next-connect";
import { connectDb, disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart.js";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await connectDb();

    const { cart } = req.body;
    const user = await User.findById(req.user);
    const existing_cart = await Cart.findOne({ user: user._id });
    if (existing_cart) {
      await existing_cart.deleteOne();
    }
    const dbProducts = await Promise.all(
      cart.map((item) => Product.findById(item._id).lean())
    );

   
    const products = cart.map((item, i) => {
      const dbProduct = dbProducts[i];
      const subProduct = dbProduct.subProducts[item.style];

      const price = Number(
        subProduct.sizes.find((p) => p.size == item.size).price
      );
      const finalPrice =
        subProduct.discount > 0
          ? (price - price / Number(subProduct.discount)).toFixed(2)
          : price.toFixed(2);

      return {
        name: dbProduct.name,
        product: dbProduct._id,
        image: subProduct.images[0].url,
        color: {
          color: item.color.color,
          image: item.color.image,
        },
        qty: Number(item.qty),
        size: item.size,
        price: finalPrice,
      };
    });

    
    const cartTotal = products.reduce(
      (sum, p) => sum + parseFloat(p.price) * p.qty,
      0
    );

    
    const savedCart = await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    await disconnectDb();
    return res.status(200).json({ message: "Cart saved", cart: savedCart });
  } catch (error) {
    console.error(error);
    await disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
