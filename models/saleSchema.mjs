import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
                validator: async function (userId) {
                    const user = await mongoose.models.User.findById({ _id: userId });
                    return !!user;
                },
                message: props => `User with ID: ${props.value} does not exist`, 
            },
    },
    invoiceId: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
    shopName: {
      type: String,
      required: true,
      lowercase: true,
    },
    total: {
      type: Number,
      required: true,
    },
    wines: {
      type: [String],
      lowercase: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Sale", saleSchema);
