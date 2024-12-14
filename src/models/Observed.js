import { Schema, model } from "mongoose"

const Wallet = {
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
}

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
