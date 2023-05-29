import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 2, max: 100 },
    description: { type: String, required: true, min: 2 },
    price: { type: Number, required: true, min: 2, max: 50 },
    category: { type: String, required: true, min: 2, max: 100 },
    userId: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
