import { Schema, model, models } from "mongoose";

export const DistributionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  erc20: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Distribution = models.distribution || model("distribution", DistributionSchema);

export default Distribution;
