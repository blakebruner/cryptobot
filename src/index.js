import { Client, GatewayIntentBits, Partials } from "discord.js"
import { CommandKit } from "commandkit"
import { success, error } from "@paperdave/logger"
import { mongoose } from "mongoose"
// import "@utils/error"

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.Message,
		Partials.Reaction
	]
});

new CommandKit({
	client,
	commandsPath: `${import.meta.dir}/commands`,
	eventsPath: `${import.meta.dir}/events`,
	bulkRegister: true
});

mongoose.set("strictQuery", false)
await mongoose.connect(process.env.DB_STRING).then(() => {
	success("Connected to MongoDB")
}).catch(err => {
	error(err)
})

client.login(process.env.TOKEN);