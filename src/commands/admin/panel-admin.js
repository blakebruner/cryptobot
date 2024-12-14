import { buildEmbed, buildStringSelect } from "@utils/builder"
import { randomUUID } from "crypto"
import { CONFIG } from "@main/config"

const homeActions = CONFIG.panels.admin.home.actions

export const data = {
	name: "panel-admin",
	description: "Sends the admin admin panel",
}

export const run = async ({ interaction, client }) => {
	// create an embed from the path in EMBED (config.js)
	const embed = buildEmbed({
		path: "panels-admin",
	})
	// create a stringSelect from the path in STRING_SELECT (config.js)
	const stringSelect = buildStringSelect({
		path: "panels-admin",
		// we get the actions from the CONFIG, cached at the top of this file, send the homeAction for init
		options: homeActions,
		// replace the placeholder in the stringSelect with the current menu state (home is default)
		replacements: ["home"]
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