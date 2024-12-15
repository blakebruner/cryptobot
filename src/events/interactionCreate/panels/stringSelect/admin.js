import { panelAdminController, panelEditController } from "@controllers/panelController"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type
	const [category, type] = interaction.customId.split("|")
	// ensure it's from a panel and is admin
	if (category !== "panels" || type !== "admin") {
		return
	}
	// ensure it's a stringSelect
	if (!interaction.isStringSelectMenu()) {
		return
	}
	// init the panel actions (panelController.js)
	const panelAdminActions = await panelAdminController(interaction)
	// action (panel action clicked) | name (observed entity selected) | arg (if needed)
	const [action, name, arg] = interaction.values[0].split("|")
	// path is to locate the object in the config
	const path = `${category}-${type}-${action}`
	console.log("path: " + path)
	// if no name, we know it's just an admin panel action
	if (!name) {
		return panelAdminActions.fetchObserved(path)
	}
	// check if we need to go back to previous menu
	// now we know it's an observed entity, so we can handle it, init the panelEditController
	const panelEditActions = await panelEditController(interaction, name)
	switch (action) {
		case "addwallet": {
			return panelEditActions.handleWalletAdd()
		}
		case "back": {
			// arg is previous menu state
			console.log(action, name, arg)
		}
	}
	// TODO: validate name still exists in cache
	return
}
