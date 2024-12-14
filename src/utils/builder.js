import { ComponentType, GuildMember, User } from "discord.js"
import { CONFIG, EMBED, STRING_SELECT, MODAL } from "@main/config"
import { PROJECT, EMOJIS_COUNT, PANEL_ACTIONS, parseHexColor } from "@utils/parsed"

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

export function buildOptionList(arr) {
	arr.map((item, index) => {
		if (typeof item !== "object") {
			// TODO: could handle this later, for now skip non objects
			return
		}
		let { emoji, description, ...rest } = item
		if (!emoji) {
			item.emoji = {
				name: EMOJIS_COUNT[index],
			}
		}
		return {
			...rest,
			emoji,
		}
	})
	// TODO: add a back button here for previous menu state
	// could just make another function, then when implemented append to the array
	return arr
}

export function buildModal({ path, replacements = [] }) {
	const { custom_id, title, components } = resultFromPath(MODAL, path, replacements)
	const buildComponents = components.map(component => {
		if (typeof component === "string") {
			// need to traverse these by default for replacements
			component = resultFromPath(MODAL, component, replacements)
		}
		return {
			type: ComponentType.ActionRow,
			components: [
				component,
			]
		}
	})
	return {
		custom_id,
		title,
		components: [
			...buildComponents
		]
	}
}

export function buildPanelActions({ path, replacements = [] }) {
	const actions = resultFromPath(PANEL_ACTIONS, path, replacements)
	return actions
}

function resultFromPath(obj, path, replacements) {
	// replace strings inside an object
	const loopItem = (item) => {
		for (const key in item) {
			// ensure we're not modifying the prototype
			if (item.hasOwnProperty(key) && typeof item[key] === "string") {
				item[key] = replaceRegex(item[key], replacements)
			}
		}
		return item
	}
	// get value from object using path
	let result = path.split("-").reduce((acc, key) => acc?.[key], obj)
	// handle arrays
	if (Array.isArray(result)) {
		result.forEach((res, index) => {
			if (typeof res === "object" && res !== null) {
				// Clone the object before modifying
				result[index] = loopItem(structuredClone(res))
			}
		})
	}
	// handle objects
	if (result && typeof result === "object") {
		result = loopItem(structuredClone(result))
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
