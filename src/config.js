import { ComponentType, TextInputStyle, ButtonStyle } from "discord.js"

export const CONFIG = {
	project: {
		imageUrl: "", // needs file extension
		name: "Whale Watcher",
		color: "#75aaff",
	},
	builder: {
		emojis: {
			loading: {
				name: "⌛",
			},
			success: {
				name: "✅",
			},
			error: {
				name: "❌",
			},
			count: [
				"1️⃣",
				"2️⃣",
				"3️⃣",
				"4️⃣",
				"5️⃣",
				"6️⃣",
				"7️⃣",
				"8️⃣",
				"9️⃣",
				"🔟"
			]
		},
	},
	currencies: [
		{
			label: "Bitcoin",
			value: "bitcoin",
			description: "Click to select BTC",
		},
		{
			label: "Solana",
			value: "solana",
			description: "Click to select SOL",
		},
	],
	panels: {
		actions: {
			admin: [
				// {
				// 	label: "Lookup Observed",
				// 	value: "lookup",
				// 	description: "Lookup and select an observed entity",
				// 	emoji: {
				// 		name: "🔍",
				// 	},
				// },
				{
					label: "Create Observed",
					value: "create",
					description: "Create an observed entity",
					emoji: {
						name: "✅",
					},
				},
				{
					label: "Edit Observed",
					value: "edit",
					description: "Edit an observed entity",
					emoji: {
						name: "🔧",
					},
				},
				{
					label: "Delete Observed",
					value: "delete",
					description: "Delete an observed entity",
					emoji: {
						name: "❌",
					},
				},
			],
			edit: [
				{
					label: "Add Wallet",
					value: "addwallet|{0}",
					description: "Add a crypto wallet to {0}",
					emoji: {
						name: "💼",
					},
				},
				{
					label: "Remove Wallet",
					value: "removewallet|{0}",
					description: "Remove a crypto wallet from {0}",
					emoji: {
						name: "🚫",
					},
				},
				{
					label: "Add Social",
					value: "addsocial|{0}",
					description: "Add a social link to {0}",
					emoji: {
						name: "🔗",
					},
				},
				{
					label: "Remove Social",
					value: "removesocial|{0}",
					description: "Remove a social link from {0}",
					emoji: {
						name: "🔗",
					},
				},
				{
					label: "Toggle Active",
					value: "toggle|{0}",
					description: "Toggle the active state of {0}",
					emoji: {
						name: "🔄",
					},
				},
			]
		},
	}
}

export const EMBED = {
	panels: {
		admin: {
			home: {
				title: "Admin Panel",
				description: "Click the menu below and select the **action** you require!",
			},
			edit: {
				title: "Edit Panel » ({0})",
				description: "Click the menu below and select the **action** you require!\n**SELECTED: {0}**",
			},
			addwallet: {
				title: "Add Wallet » ({0})",
				description: "To add a **wallet** select a currency!",
			},
		},
	},
}

export const STRING_SELECT = {
	panels: {
		admin: {
			custom_id: "panels|admin|{0}",
			placeholder: "📌 Select an action...",
		},
		addwallet: {
			custom_id: "panels|admin|addwallet",
			placeholder: "💸 Select a currency...",
		}
	},
}

export const MODAL = {
	generic: {
		observed: {
			type: ComponentType.TextInput,
			custom_id: "name",
			label: "Name of the Observed?",
			placeholder: "TODO: tell cmd for list",
			style: TextInputStyle.Short,
			required: true,
			max_length: 50
		}
	},
	panels: {
		admin: {
			create: {
				title: "Create Observed Entity",
				custom_id: "panels|admin|create|{0}",
				components: [
					"generic-observed"
				]
			},
			edit: {
				title: "Edit Observed Entity",
				custom_id: "panels|admin|edit|{0}",
				components: [
					"generic-observed"
				]
			},
			delete: {
				title: "Delete Observed Entity",
				custom_id: "panels|admin|delete|{0}",
				components: [
					"generic-observed"
				]
			},
		}
	},
}
