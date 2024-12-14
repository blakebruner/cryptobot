import { buildEmbed, buildStringSelect, buildPanelActions } from "@utils/builder"

export const data = {
	name: "panel-admin",
	description: "Sends the admin admin panel",
}

export const run = async ({ interaction, client }) => {
	// create an embed from the path in EMBED (config.js)
	const embed = buildEmbed({
		path: "panels-admin-home",
	})
	const panelActions = buildPanelActions({
		path: "admin",
	})
	// create a stringSelect from the path in STRING_SELECT (config.js)
	const stringSelect = buildStringSelect({
		path: "panels-admin",
		options: panelActions,
	})
	// finally, send the data - ephemeral means only the user can see it
	await interaction.reply({
		embeds: [embed],
		components: [stringSelect],
		ephemeral: true,
	})
}

export const options = {
	userPermissions: ["Administrator"],
}