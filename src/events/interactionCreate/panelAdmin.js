import { panelAdminController, panelEditController } from "@controllers/panelController"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | action (what user clicked for modals, or selected observed name for stringSelect) | arg (if needed)
	const [category, type, action, arg] = interaction.customId.split("|")
	// ensure it's from a panel and is admin
	if (category !== "panels" || type !== "admin") {
		return
	}
	// init the panel actions (panelController.js)
	const panelAdminActions = await panelAdminController(interaction)
	if (interaction.isModalSubmit()) {
		switch (action) {
			case "create": {
				return panelAdminActions.handleCreate()
			}
			case "edit": {
				return panelAdminActions.handleEdit()
			}
			case "delete": {
				return panelAdminActions.handleDelete()
			}
			default: {
				// if it's not an action, it's a name for an observed entity
				// TODO: ????
				return
			}
		}
	}
	if (interaction.isStringSelectMenu()) {
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
}
