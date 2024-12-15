import { buildEmbed, buildStringSelect, buildModal, buildPanelActionList, buildOptionList } from "@utils/builder"
import { createObserved, deleteObserved, getObserved } from "@repos/observed"
import { currencyArr } from "@repos/wallet"
import { getModalValues } from "@utils/interact"
import { randomUUID } from "crypto"

export const panelAdminController = async (interaction) => {
	let modalValues
	if (interaction.isModalSubmit()) {
		// if it's a modal submit, get the values
		modalValues = getModalValues(interaction)
	}
	return {
		fetchObserved: async (path) => {
			const modal = buildModal({
				path,
				replacements: [randomUUID()]
			})
			await interaction.showModal(modal)
			// reset string select
			await interaction.editReply({
				ephemeral: true,
			})
		},
		handleCreate: async () => {
			const { name } = modalValues
			const observed = await createObserved(name)
			if (!observed) {
				await interaction.reply({
					content: `Observed: ${name} already exists!`,
					ephemeral: true,
				})
				return
			}
			await interaction.reply({
				content: `Created Observed: ${name}!`,
				ephemeral: true,
			})
		},
		handleEdit: async () => {
			const { name } = modalValues
			const observed = await ensureObservedExists(interaction, name)
			if (!observed) {
				return
			}
			// create an embed from the path in EMBED (config.js)
			const embed = buildEmbed({
				path: "panels-admin-edit",
				replacements: [name]
			})
			const panelActions = buildPanelActionList({
				panelType: "edit",
				replacements: [name]
			})
			const stringSelect = buildStringSelect({
				path: "panels-admin",
				options: panelActions,
				// replace the placeholder in the stringSelect with the current menu state
				replacements: ["edit"]
			})
			// finally, send the data - ephemeral means only the user can see it
			await interaction.reply({
				embeds: [embed],
				components: [stringSelect],
				ephemeral: true,
			})
		},
		handleDelete: async () => {
			const { name } = modalValues
			await deleteObserved(name)
			await interaction.reply({
				content: `Deleted Observed: ${name}!`,
				ephemeral: true,
			})
		}
	}
}

export const panelEditController = async (interaction, name) => {
	// always ensure that the observed entity exists
	const observed = await ensureObservedExists(interaction, name)
	if (!observed) {
		return
	}
	return {
		handleWalletAdd: async () => {
			// TODO: modify embed to show different wallet types
			const embed = buildEmbed({
				path: "panels-admin-addwallet",
				replacements: [name]
			})
			const panelActions = buildOptionList({
				arr: currencyArr,
				path: "back",
				replacements: [name, "edit"]
			})
			const stringSelect = buildStringSelect({
				path: "panels-addwallet",
				options: panelActions,
				// replace the placeholder in the stringSelect with the current menu state
				replacements: ["edit"]
			})
			// finally, update the current message with the new data
			await interaction.update({
				embeds: [embed],
				components: [stringSelect],
				ephemeral: true,
			})
		},
	}
}

async function ensureObservedExists(interaction, name) {
	const observed = await getObserved(name)
	if (!observed) {
		await interaction.reply({
			content: `Observed: ${name} does not exist!`,
			ephemeral: true,
		})
		return
	}
	return observed
}

async function panelHandleCreate(interaction, name, panelName, update) {
	const observed = await ensureObservedExists(interaction, name)
	if (!observed) {
		return
	}
	// create an embed from the path in EMBED (config.js)
	const embed = buildEmbed({
		path: "panels-admin-edit",
		replacements: [name]
	})
	const panelActions = buildPanelActionList({
		panelType: "edit",
		replacements: [name]
	})
	const stringSelect = buildStringSelect({
		path: "panels-admin",
		options: panelActions,
		// replace the placeholder in the stringSelect with the current menu state
		replacements: ["edit"]
	})
	// finally, send the data - ephemeral means only the user can see it
	const response = {
		embeds: [embed],
		components: [stringSelect],
		ephemeral: true,
	}
	if (update) {
		await interaction.update(response)
		return
	}
	await interaction.reply(response)
}
