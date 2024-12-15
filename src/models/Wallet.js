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
	observed: {  // Reference to the Observed schema (_id)
		type: Schema.Types.ObjectId,
		ref: "Observed"
	},
	active: {
		type: Boolean,
		default: true
	},
}))
