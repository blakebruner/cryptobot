import { ComponentType, GuildMember, User } from "discord.js"
import { EMBED, STRING_SELECT } from "@main/config"
import { PROJECT, parseHexColor } from "@utils/parsed"

const localeRegex = /{(\d+)}/g
const { name: projectName, color: projectColor, imageUrl: projectImageUrl } = PROJECT

export function buildEmbed({ path, user, replacements = [], overrides }) {
	const { title, description, fields, footer, image, color } = resultFromPath(EMBED, path, replacements)
	const embed = {
		title,
		description,
		color: projectColor,
		// thumbnail: {
		// 	url: projectImageUrl
		// },
		timestamp: new Date().toISOString(),
		footer: {
			text: projectName,
			// icon_url: projectImageUrl
		}
	}
	if (projectImageUrl) {
		embed.thumbnail.url = projectImageUrl
		embed.footer.icon_url = projectImageUrl
	}
	if (user) {
		let url
		if (user instanceof GuildMember || user instanceof User) {
			url = user.displayAvatarURL()
		} else if (typeof user === "string") {
			if (user === "none") {
				url = undefined
			} else {
				url = user
			}
		}
		embed.thumbnail = { url }
	}
	if (color) {
		embed.color = parseHexColor(color)
	}
	if (overrides) {
		Object.assign(embed, overrides)
	}
	return embed
}

export function buildStringSelect({ path, options = [], replacements = [] }) {
	const { custom_id, placeholder } = resultFromPath(STRING_SELECT, path, replacements)
	if (options instanceof Map) {
		options = [...options.values()]
	}
	return {
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.StringSelect,
				custom_id,
				placeholder,
				options: [
					...options
				]
			},
		]
	}
}

function resultFromPath(obj, path, replacements) {
	let result = path.split("-").reduce((acc, key) => acc[key], obj)
	if (typeof result === "object") {
		// deep clone to not override
		result = structuredClone(result)
	}
	if (typeof result !== "object") {
		return result
	}
	for (const [key, val] of Object.entries(result)) {
		if (typeof val === "string") {
			result[key] = replaceRegex(val, replacements)
		}
	}
	return result
}

function replaceRegex(text, args) {
	if (!args.length) {
		return text
	}
	const matches = text.match(localeRegex)
	if (!matches) {
		return text
	}
	return text.replace(localeRegex, (match) => {
		const matchNum = Number(match.match(/\d+/)[0])
		// get the value from the args array
		return args[matchNum]
	})
}
