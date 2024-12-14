import { Schema, model } from "mongoose"

export const Observed = model("Observed", new Schema({
	name: {
		type: String
	},
	crypto: { // Reference to Wallet schema (_id)
		type: Schema.Types.ObjectId,
		ref: "Wallet"
	},
	socials: {
		type: Map,
		of: String,
		default: new Map()
	},
	active: {
		type: Boolean,
		default: true
	},
}))
