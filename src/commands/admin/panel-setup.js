import { buildEmbed, buildStringSelect } from "@utils/builder"
import { randomUUID } from "crypto"
import { CONFIG } from "@main/config"

const homeActions = CONFIG.panels.setup.homeActions

export const data = {
	name: "panel-setup",
	description: "Sends the admin setup panel",
}

export const run = async ({ interaction, client }) => {
	// create an embed from the path in EMBED (config.js)
	const embed = buildEmbed({
		path: "panels-setup",
	})
	// create a stringSelect from the path in STRING_SELECT (config.js)
	const stringSelect = buildStringSelect({
		path: "panels-setup",
		// we get the actions from the CONFIG, cached at the top of this file, send the homeAction for init
		options: homeActions,
		// we need a uuid so every select is unique, this will replace {0} in the custom_id
		replacements: [randomUUID()]
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