import { ApplicationCommandOptionType } from "discord.js"
import { whaleArr, getWhale } from "@repos/whale"

export const data = {
  name: "setup-whale-wallet",
  description: "Setup whale wallet",
  options: [
    {
      name: "name",
      description: "Set the whale's name",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        ...whaleArr
      ]
    },
  ]
}

export const run = async ({ interaction, client }) => {
  const { options } = interaction
  const commandValue = options.get("name").value
  const whale = await getWhale(commandValue)
  await interaction.reply({
    content: `Selected Whale: ${whale.name}!`,
    ephemeral: true,
  })
}

export const options = {
  userPermissions: ["Administrator"],
}