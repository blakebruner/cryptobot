import { panelAdminModalActions } from "@controllers/panels"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | action (what user clicked)
	const [category, panelType, action] = interaction.customId.split("|")
	// ensure it's from a panel and is admin
	if (category !== "panels" || panelType !== "admin") {
		return
	}
	// ensure it's a modal submit
	if (!interaction.isModalSubmit()) {
		return
	}
	const panelActions = await panelAdminModalActions(interaction)
	switch (action) {
		case "create": {
			return panelActions.handleCreate()
		}
		case "edit": {
			return panelActions.handleEdit()
		}
		case "delete": {
			return panelActions.handleDelete()
		}
	}
	return
}
