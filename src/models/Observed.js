import { Schema, model } from "mongoose"
import { Wallet } from "@models/Wallet"

export const Observed = model("Observed", new Schema({
	name: {
		type: String
	},
	crypto: {
		type: Map,
		of: Wallet,
		default: new Map()
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
}));
