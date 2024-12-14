import { panelModalController } from "@controllers/panelController"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | action (what user clicked, for modals)
	const [category, type, action] = interaction.customId.split("|")
	// ensure it's from a panel and is admin
	if (category !== "panels" || type !== "admin") {
		return
	}
	// init the panel actions (panelController.js)
	const panelActions = await panelModalController(interaction)
	if (interaction.isModalSubmit()) {
		switch (action) {
			case "create": {
				return panelActions.handleCreate()
			}
			case "modify": {
				return panelActions.handleModify()
			}
			case "delete": {
				return panelActions.handleDelete()
			}
		}
		return
	}
	if (interaction.isStringSelectMenu()) {
		// redefine action to the selected value, since customId action is different
		const [action] = interaction.values
		// path is to locate the object in the config
		const path = `${category}-${type}-${action}`
		return panelActions.fetchObserved(path)
	}
}
