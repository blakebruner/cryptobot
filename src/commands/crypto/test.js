export const data = {
	name: "crypto-test",
	description: "Test crypto API calls!"
}

export const run = ({ interaction, client }) => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-Key': process.env.BLOCKDAEMON
		}
	};

	fetch('https://svc.blockdaemon.com/universal/v1/bitcoin/mainnet/account/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', options)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.error(err));

	interaction.reply({
		content: `🏓 WebSocket: \`${client.ws.ping}ms\``,
		ephemeral: true
	})
}

export const options = {
	// https://commandkit.js.org/typedef/CommandOptions
}