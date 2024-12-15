import { buildEmbed, buildStringSelect, buildModal, buildPanelActionList, buildOptionList } from "@utils/builder"
import { createObserved, deleteObserved, getObserved } from "@repos/observed"
import { getPanelDefaultPath, createPanelPath } from "@repos/panels"
import { currencyArr, getCurrency, createWallet } from "@repos/wallet"
import { getModalValues } from "@utils/interact"
import { randomUUID } from "crypto"

// -- modal actions

export const panelAdminModalActions = async (interaction) => {
	// only handle admin modal interactions
	const modalValues = getModalValues(interaction)
	const { name } = modalValues
	return {
		handleCreate: async () => {
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
			const observed = await ensureObservedExists(interaction, name)
			if (!observed) {
				return
			}
			// panelType is edit since this opens the edit panel
			const panelType = "edit"
			return panelCreatePayload(interaction, panelType, {
				replacements: [name],
			})
		},
		handleDelete: async () => {
			await deleteObserved(name)
			await interaction.reply({
				content: `Deleted Observed: ${name}!`,
				ephemeral: true,
			})
		}
	}
}

export const panelEditModalActions = async (interaction, name) => {
	// only handle admin modal interactions
	const observed = await ensureObservedExists(interaction, name)
	if (!observed) {
		// TODO: handle ??
		return
	}
	const modalValues = getModalValues(interaction)
	return {
		handleCurrencyAdd: async () => {
			// validate currency
			let currency = Object.keys(modalValues)[0]
			const address = modalValues[currency]
			currency = getCurrency(currency)
			if (!currency) {
				await interaction.reply({
					content: `Currency: ${currency} does not exist!`,
					ephemeral: true,
				})
				return
			}
			const { label, value } = currency
			const wallet = await createWallet(address, value, observed)
			if (!wallet) {
				await interaction.reply({
					content: `Wallet: ${address} already exists!`,
					ephemeral: true,
				})
				return
			}
			await interaction.reply({
				content: `Added ${label} wallet: ${address}!`,
				ephemeral: true,
			})
		},
	}
}

// -- string select actions

export const panelEditSelectActions = async (interaction, panelType, name, action) => {
	// always ensure that the observed entity exists
	const observed = await ensureObservedExists(interaction, name)
	if (!observed) {
		// TODO: handle ??
		return
	}
	// path is to locate the object in the config
	const path = createPanelPath(panelType, action)
	return {
		handleWalletAdd: async () => {
			// options callback for payload
			const options = () => {
				return buildOptionList({
					arr: currencyArr,
					action: "back",
					replacements: ["addcurrency"], // append addcurrency to front, so when user selects back, it goes back to addcurrency
					replaceDirection: "front",
				})
			}
			return panelCreatePayload(interaction, panelType, {
				path: action,
				replacements: [name],
				options,
				update: true,
			})
		},
		handleCurrencyAdd: async (currency) => {
			// ensure currency exists
			currency = getCurrency(currency)
			if (!currency) {
				await interaction.reply({
					content: `Currency: ${currency} does not exist!`,
					ephemeral: true,
				})
				return
			}
			const { label, value } = currency
			return panelPromptModal(interaction, path, [randomUUID(), label, name, value])
		},
	}
}

// -- internal actions

export async function panelCreatePayload(interaction, panelType, { path, replacements, options, update }) {
	// assign path to default if not provided
	const pathDefault = getPanelDefaultPath(panelType)
	if (!path) {
		path = pathDefault
	} else {
		path = createPanelPath(panelType, path)
	}
	const isDefault = path === pathDefault
	const embed = buildEmbed({
		path,
		replacements
	})
	// TODO: hacky, might need to fix this
	if (typeof options !== "function" && isDefault) {
		// since this is the default, we can build the default panel action list
		options = buildPanelActionList({ panelType })
	} else {
		options = options()
	}
	const stringSelect = buildStringSelect({
		path,
		options,
		replacements
	})
	// finally, send the data - ephemeral means only the user can see it
	const response = {
		embeds: [embed],
		components: [stringSelect],
		ephemeral: true,
	}
	// handle update if needed
	if (update) {
		await interaction.update(response)
		return
	}
	await interaction.reply(response)
}

export async function panelPromptModal(interaction, path, replacements = [randomUUID()]) {
	const modal = buildModal({
		path,
		replacements
	})
	await interaction.showModal(modal)
	// reset string select
	await interaction.editReply({
		ephemeral: true,
	})
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
