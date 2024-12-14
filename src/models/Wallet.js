import { Schema, model } from "mongoose"

export const Wallet = model("Wallet", new Schema({
  currency: {
    type: String
  },
  address: {
    type: String
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  // transactions: {
  //   type: [transaction]
  // }
}))
