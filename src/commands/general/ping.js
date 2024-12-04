const { EmbedBuilder } = require('discord.js');
/** @type {import("commandkit").CommandData}  */
export const data = {
	name: "ping",
	description: "Replies with your ping!"
}

/**
 * @param {import("commandkit").SlashCommandProps} param0 
 */
export const run = ({ interaction, client }) => {

	// inside a command, event listener, etc.
	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

	interaction.reply({ embeds: [exampleEmbed] });
	// interaction.reply({
	// 	content: `🏓 WebSocket: \`${client.ws.ping}ms\``,
	// 	ephemeral: true
	// })
}

/** @type {import("commandkit").CommandOptions} */
export const options = {
	// https://commandkit.js.org/typedef/CommandOptions
}