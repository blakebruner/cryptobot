import { success } from "@paperdave/logger"

/** * @param {import('discord.js').Client} client */
export default (client) => {
	success(`${client.user.tag} is online!`)
}