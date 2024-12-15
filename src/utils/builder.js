import { ComponentType, GuildMember, User } from "discord.js"
import { BUILDER, PROJECT, EMBED, STRING_SELECT, MODAL, parseHexColor } from "@main/config"
import { getPanel } from "@repos/panels"

const localeRegex = /{(\d+)}/g
const builderActions = BUILDER.actions
const builderIteratorArr = BUILDER.iterator

export function buildEmbed({ path, user, replacements = [], overrides }) {
	const { title, description, fields, footer, image, color } = resultFromPath(EMBED, path, replacements)
	const embed = {
		title,
		description,
		color: PROJECT.color,
		// thumbnail: {
		// 	url: projectImageUrl
		// },
		timestamp: new Date().toISOString(),
		footer: {
			text: PROJECT.name,
			// icon_url: projectImageUrl
		},
	}
	if (PROJECT.imageUrl) {
		embed.thumbnail.url = PROJECT.imageUrl
		embed.footer.icon_url = PROJECT.imageUrl
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
				options: [...options],
			},
		],
	}
}

export function buildOptionList({ arr, action, replacements = [], replaceDirection }) {
	const replacementsLength = replacements.length
	let optionList = []
	arr.forEach((item, index) => {
		if (typeof item !== "object") {
			// TODO: could handle this later, for now skip non objects
			return
		}
		const { emoji, value, ...rest } = item
		const option = {
			...rest,
		}
		if (!emoji) {
			option.emoji = {
				name: builderIteratorArr[index],
			}
		}
		// if replacements exist, this will add the replacement points like custom_id
		if (replacementsLength > 0) {
			option.value = addReplacementPoints(value, replacements, replaceDirection)
		}
		optionList.push(option)
	})
	// since we know this an array, we can override the path and use the replacements
	optionList = resultFromPath(optionList, false, replacements)
	// action is the key, since we're only appending from builderActions, works as a path
	if (action) {
		const appendComponent = resultFromPath(builderActions, action, replacements)
		optionList.push(appendComponent)
	}
	return optionList
}

export function buildModal({ path, replacements = [] }) {
	const { custom_id, title, components } = resultFromPath(MODAL, path, replacements)
	const buildComponents = components.map((component) => {
		if (typeof component === "string") {
			// need to traverse these by default for replacements
			component = resultFromPath(MODAL, component, replacements)
		}
		return {
			type: ComponentType.ActionRow,
			components: [component],
		}
	})
	return {
		custom_id,
		title,
		components: [...buildComponents],
	}
}

export function buildPanelActionList({ panelType, replacements = [] }) {
	const panel = getPanel(panelType)
	return resultFromPath(panel, "actionList", replacements)
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
	// only if it's a string we need to traverse, if no path it's just the object (overrides)
	let result = path ? path.split("-").reduce((acc, key) => acc?.[key], obj) : obj
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

function addReplacementPoints(value, replacements, replaceDirection) {
	if (!replacements.length || !replaceDirection) {
		return value
	}
	// direction is either front or back, for |{0} or {0}|
	switch (replaceDirection) {
		case "back":
			return value + replacements.map((_, index) => `|{${index}}`).join("")
		case "front":
			return replacements.map((_, index) => `{${index}}|`).join("") + value
	}
}
