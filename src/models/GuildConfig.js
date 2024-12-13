import { Schema, model } from "mongoose"

export const GuildConfig = model("GuildConfig", new Schema({
	guildId: {
		type: String,
		required: true
	},
	channelIds: {
		type: Map,
		of: String,
		default: new Map()
	},
	roleIds: {
		type: Map,
		of: String,
		default: new Map()
	}
}))
