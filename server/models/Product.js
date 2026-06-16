import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title_uz: { type: String, required: true },
  title_en: { type: String, required: true },
  title_ru: { type: String, required: true },
  category_uz: { type: String, required: true },
  category_en: { type: String, required: true },
  category_ru: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
