import { panelEditModalActions } from "@controllers/panels"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | action (what user clicked) | arg (if needed)
	const [category, panelType, action, uuid, arg] = interaction.customId.split("|")
	// ensure it's from a panel and is edit
	if (category !== "panels" || panelType !== "edit") {
		return
	}
	// ensure it's a modal submit
	if (!interaction.isModalSubmit()) {
		return
	}
	console.log("edit modal action: " + action)
	console.log("edit modal customId: " + interaction.customId)
	const panelActions = await panelEditModalActions(interaction)
	switch (action) {
		case "addcurrency": {
			return panelActions.handleCurrencyAdd()
		}
		// case "edit": {
		// 	return panelActions.handleEdit()
		// }
		// case "delete": {
		// 	return panelActions.handleDelete()
		// }
	}
	return
}
