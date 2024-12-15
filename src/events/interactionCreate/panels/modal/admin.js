import { panelAdminController } from "@controllers/panelController"

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
	// ensure it's a modal submit
	if (!interaction.isModalSubmit()) {
		return
	}
	// init the panel actions (panelController.js)
	const panelAdminActions = await panelAdminController(interaction)
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
