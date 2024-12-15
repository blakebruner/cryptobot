import { panelEditSelectActions, panelCreatePayload } from "@controllers/panels"

export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | observed name | previous menu state (if any)
	const [category, panelType, name, previous] = interaction.customId.split("|")
	// ensure it's from a panel and is edit
	if (category !== "panels" || panelType !== "edit") {
		return
	}
	console.log("edit id: " + interaction.customId)
	// ensure it's a stringSelect
	if (!interaction.isStringSelectMenu()) {
		return
	}
	// action (panel action clicked) | arg (if needed)
	const [action, arg] = interaction.values[0].split("|")
	const panelEditActions = await panelEditSelectActions(interaction, panelType, name, action)
	console.log("edit action: " + action)
	switch (action) {
		case "addwallet": {
			return panelEditActions.handleWalletAdd()
		}
		case "addcurrency": {
			// arg here is the currency
			return panelEditActions.handleCurrencyAdd(arg)
		}
		case "back": {
			return panelCreatePayload(interaction, panelType, {
				path: previous,
				replacements: [name],
				update: true,
			})
		}
	}
	return
}
