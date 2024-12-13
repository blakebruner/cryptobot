import { ApplicationCommandOptionType } from "discord.js"
import { buildEmbed } from "@utils/builder"

export const data = {
	name: "panel-setup",
	description: "Sends the admin setup panel",
}

export const run = async ({ interaction, client }) => {
	// const { options } = interaction
	// const commandValue = options.get("name").value
	// await createWhale(commandValue)
	const embed = buildEmbed({
		path: "panels-setup",
	})
	await interaction.reply({
		embeds: [embed],
		ephemeral: true,
	})
}

export const options = {
	userPermissions: ["Administrator"],
}