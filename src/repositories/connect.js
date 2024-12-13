import { GuildConfig } from "@models/GuildConfig"

export async function initGuild(contextOrId) {
	let guildId = contextOrId
	if (guildId.guildId) {
		guildId = guildId.guildId
	} else if (guildId.guild) {
		guildId = guildId.guild.id
	}
	let config = await GuildConfig.findOne({ guildId })
	if (!config) {
		config = new GuildConfig({ guildId })
		await config.save()
	}
	return config
}