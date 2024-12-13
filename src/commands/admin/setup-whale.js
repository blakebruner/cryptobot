import { ApplicationCommandOptionType, ChannelType } from "discord.js"
import { CURRENCY_MAP } from "@utils/parsed"
import { createWhale } from "@repos/whale"

export const data = {
	name: "setup-whale",
	description: "Setup whale schema",
	options: [
		{
			name: "name",
			description: "Set the whale's name",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	]
}

export const run = async ({ interaction, client }) => {
	const { options } = interaction
	const commandValue = options.get("name").value
	await createWhale(commandValue)
	await interaction.reply({
		content: `Created Whale: ${commandValue}!`,
		ephemeral: true,
	})
}

export const options = {
	userPermissions: ["Administrator"],
}