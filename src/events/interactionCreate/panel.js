export default async (interaction) => {
	// since this fires for all interactions, we need to check if it's a component (has customId)
	if (!interaction.customId) {
		return
	}
	// panels | panel_type | uuid (data from customId)
	const [category, type] = interaction.customId.split("|")
	// ensure it's from a panel
	if (category !== "panels") {
		return
	}
	// ensure it's from a string select
	if (!interaction.isStringSelectMenu()) {
		return
	}
	// the action is the value of whatever the user chooses in the string select
	const [action] = interaction.values
	// handle the admin setup and user lookup differently
	switch (type) {
		case "setup": {
			// admin here
			console.log(`setup ${action}`)
			break
		}
		case "lookup": {
			// user here
			console.log(`lookup ${action}`)
			break
		}
	}
}
