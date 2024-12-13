import { success, error } from "@paperdave/logger"
import { CONFIG } from "@main/config"

const { project, currencies } = CONFIG

export const PROJECT = parseProject(project)

function parseProject(project) {
	const { color, ...args } = project
	return {
		color: parseHexColor(color),
		...args,
	}
}

export const CURRENCY_ARR = [...currencies]
export const CURRENCY_MAP = parseCurrency(CURRENCY_ARR)

function parseCurrency(currArr) {
	const map = new Map()
	currArr.forEach(curr => {
		const { name, value } = curr
		map.set(value, {
			name,
			value,
		})
	})
	return map
}

export function parseHexColor(color) {
	return parseInt(color.replace("#", ""), 16);
}

success("Config loaded successfully!")
