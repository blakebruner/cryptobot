import { ApplicationCommandOptionType } from "discord.js"
import { getWhale } from "@repos/whale"

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
        
      ]
    },
  ]
}

export const run = async ({ interaction, client }) => {

}

export const options = {
  userPermissions: ["Administrator"],
}