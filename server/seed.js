import "dotenv/config";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import Like from "./models/Like.js";
import Carousel from "./models/Carousel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const data = JSON.parse(readFileSync(join(__dirname, "db.json"), "utf-8"));

    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Cart.deleteMany({}),
      Like.deleteMany({}),
      Carousel.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    const products = await Product.insertMany(data.products);
    console.log(`Seeded ${products.length} products`);

    const users = await User.insertMany(
      data.users.map((u) => ({ username: u.username, password: u.password }))
    );
    console.log(`Seeded ${users.length} users`);

    const userMap = {};
    data.users.forEach((u, i) => {
      userMap[u.id] = users[i]._id.toString();
    });

    const productMap = {};
    data.products.forEach((p, i) => {
      productMap[p.id] = products[i]._id.toString();
    });

    if (data.carousels?.length) {
      const carousels = await Carousel.insertMany(
        data.carousels.map((c) => ({ image: c.image }))
      );
      console.log(`Seeded ${carousels.length} carousels`);
    }

    if (data.cart?.length) {
      const cartItems = await Cart.insertMany(
        data.cart.map((c) => ({
          userId: userMap[c.userId] || c.userId,
          productId: productMap[c.productId] || c.productId,
          product: c.product,
          quantity: c.quantity,
        }))
      );
      console.log(`Seeded ${cartItems.length} cart items`);
    }

    if (data.likes?.length) {
      const likes = await Like.insertMany(
        data.likes.map((l) => ({
          userId: userMap[l.userId] || l.userId,
          productId: productMap[l.productId] || l.productId,
          product: l.product,
        }))
      );
      console.log(`Seeded ${likes.length} likes`);
    }

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
