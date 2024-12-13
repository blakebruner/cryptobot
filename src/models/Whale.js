import { Schema, model } from "mongoose"

export const Whale = model("Whale", new Schema({
	name: {
		type: String
	},
	wallets: {
		type: [String],
	},
	socials: {
		type: Map,
		of: String,
		default: new Map()
	},
}))
