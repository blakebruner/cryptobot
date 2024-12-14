import { ComponentType, TextInputStyle, ButtonStyle } from "discord.js"

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
		admin: {
			home: {
				actions: [
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
						label: "Modify Observed",
						value: "modify",
						description: "Modify an observed entity",
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
				]
			},
			observed: {
				actions: [
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
				]
			},
		},
	}
}

export const EMBED = {
	panels: {
		admin: {
			title: "Admin Panel",
			description: "Click the menu below and select the **action** you require!",
		}
	},
}

export const STRING_SELECT = {
	panels: {
		admin: {
			custom_id: "panels|admin|{0}",
			placeholder: "📌 Select an action..",
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
			modify: {
				title: "Modify Observed Entity",
				custom_id: "panels|admin|modify|{0}",
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
