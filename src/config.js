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
			homeActions: [
				{
					label: "Lookup Observed",
					value: "lookup",
					description: "Lookup and select an observed entity",
					emoji: {
						name: "🔍",
					},
				},
				{
					label: "Create Observed",
					value: "create",
					description: "Create an observed entity",
					emoji: {
						name: "✅",
					},
				},
			],
			selectedActions: [ // TODO: update observed with username, replaced with {0}
				{
					label: "Delete Observed",
					value: "delete",
					description: "Delete an observed entity",
					emoji: {
						name: "❌",
					},
				},
				{
					label: "Add Wallet",
					value: "addwallet",
					description: "Add a crypto wallet to an observed entity",
					emoji: {
						name: "💼",
					},
				},
				{
					label: "Remove Wallet",
					value: "removewallet",
					description: "Remove a crypto wallet from an observed entity",
					emoji: {
						name: "🚫",
					},
				},
				{
					label: "Add Social",
					value: "addsocial",
					description: "Add a social link to an observed entity",
					emoji: {
						name: "🔗",
					},
				},
				{
					label: "Remove Social",
					value: "removesocial",
					description: "Remove a social link from an observed entity",
					emoji: {
						name: "🔗",
					},
				},
				{
					label: "Toggle Active",
					value: "toggle",
					description: "Toggle the active state of an observed entity",
					emoji: {
						name: "🔄",
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
			description: "Click the menu below and select the **action** you require!",
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
