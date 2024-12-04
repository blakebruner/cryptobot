/** @type {import("commandkit").CommandData}  */
export const data = {
	name: "ping",
	description: "Replies with your ping!"
}

/**
 * @param {import("commandkit").SlashCommandProps} param0 
 */
export const run = ({ interaction, client }) => {
	interaction.reply({
		content: `🏓 WebSocket: \`${client.ws.ping}ms\``,
		ephemeral: true
	})
}

/** @type {import("commandkit").CommandOptions} */
export const options = {
	// https://commandkit.js.org/typedef/CommandOptions
}