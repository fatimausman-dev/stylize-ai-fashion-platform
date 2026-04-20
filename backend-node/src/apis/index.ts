import express from "express";

import authRoute from "./auth/auth.routes";
import categoryRoute from "./category/category.routes";
import orderRoute from "./order/order.routes";
import productRoute from "./product/product.routes";
import shopRoute from "./shop/shop.routes";
import saleRoute from "./sale/sale.routes";
import userRoute from "./user/user.routes";
import insightsRoute from "./insights/insights.routes";
import wishlistRoute from "./wishlist/wishlist.routes";
import cartRoute from "./cart/cart.routes";
import styleQuiz from "./style-quiz/stylequiz.routes";
import mixAndMatchRoute from "./mix-and-match/mix-and-match.routes";

const router = express.Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/shop", shopRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);
router.use("/sale", saleRoute);
router.use("/order", orderRoute);
router.use("/wishlist", wishlistRoute);
router.use("/cart", cartRoute);
router.use("/style-quiz", styleQuiz);
router.use("/mix-and-match", mixAndMatchRoute);
router.use("/insights", insightsRoute);

export { router as api };

export default router;
