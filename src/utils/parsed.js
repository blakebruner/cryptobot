import { CONFIG } from "@main/config"

const { project, currencies, builder, panels } = CONFIG

export const PROJECT = parseProject(project)
export const PANEL_ACTIONS = panels.actions

function parseProject(project) {
	const { color, ...args } = project
	return {
		color: parseHexColor(color),
		...args,
	}
}

export const EMOJIS = builder.emojis
export const EMOJIS_COUNT = EMOJIS.count

export const CURRENCY_ARR = [...currencies]
export const CURRENCY_MAP = parseCurrency(CURRENCY_ARR)

function parseCurrency(currArr) {
	const map = new Map()
	currArr.forEach(curr => {
		const { value, ...rest } = curr
		map.set(value, {
			value,
			...rest,
		})
	})
	return map
}


export function parseHexColor(color) {
	return parseInt(color.replace("#", ""), 16)
}
