export const CONFIG = {
	project: {
		imageUrl: "", // needs file extension
		name: "Whale Watcher",
		color: "#75aaff",
	},
	currencies: [
		{
			name: "Bitcoin",
			value: "bitcoin",
			abbreviation: "BTC",
		},
		{
			name: "Solana",
			value: "solana",
			abbreviation: "SOL",
		},
	],
	panels: {
		setup: {
			actions: [
				{
					label: "Create Observed",
					value: "create",
					description: "Create an observed entity",
					emoji: {
						name: "✅",
					},
				},
			],
		},
	}
}

export const EMBED = {
	logs: {
		title: "Logs » {0}",
		description: "{1}",
	},
	panels: {
		setup: {
			title: "Admin Panel",
			description: "Click the menu below and select the **category**!",
		}
	},
}

export const STRING_SELECT = {
	panels: {
		setup: {
			custom_id: "panels|setup|{0}",
			placeholder: "📌 Select an action..",
		}
	},
}
