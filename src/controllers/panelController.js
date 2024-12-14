import { buildEmbed, buildStringSelect, buildModal } from "@utils/builder"
import { createObserved, deleteObserved } from "@repos/observed"
import { getModalValues } from "@utils/interact"
import { randomUUID } from "crypto"

export const panelModalController = async (interaction) => {
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
		handleModify: async () => {
			const { name } = modalValues
			await interaction.reply({
				content: `Modified Observed: ${name}!`,
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
		},
	}
}
