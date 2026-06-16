import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  product: {
    image: String,
    title_uz: String,
    title_en: String,
    title_ru: String,
    category_uz: String,
    category_en: String,
    category_ru: String,
    price: Number,
    originalPrice: Number,
  },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model("Cart", cartItemSchema);
