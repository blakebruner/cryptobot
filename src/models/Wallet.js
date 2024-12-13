import { Schema, model } from "mongoose"

const currencyType = {

}

const transaction = {

}

export const Wallet = model("Wallet", new Schema({
  currency: {
    type: String
  },
  address: {
    type: String
  },
  lastUpdate: {
    type: Date,
    defualt: Date.now
  },
  transactions: {
    type: [transaction]
  }
}))
