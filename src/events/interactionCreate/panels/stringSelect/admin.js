import { panelFetchObserved, panelEditSelectActions } from "@controllers/panels"
import { createPanelPath } from "@repos/panels"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type
	const [category, panelType] = interaction.customId.split("|")
	// ensure it's from a panel and is admin
	if (category !== "panels" || panelType !== "admin") {
		return
	}
	// ensure it's a stringSelect
	if (!interaction.isStringSelectMenu()) {
		return
	}
	// action (panel action clicked)
	const [action] = interaction.values[0].split("|")
	// path is to locate the object in the config
	const path = createPanelPath(panelType, action)
	return panelFetchObserved(interaction, path)
}
