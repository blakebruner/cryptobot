import { PANELS } from "@main/config"

// -- cache
export const panelArr = Object.keys(PANELS)

export function getPanel(type) {
	return PANELS[type]
}

export function getPanelActions(type) {
	return PANELS[type].actionList
}

export function getPanelDefaultPath(type) {
	const panelType = PANELS[type]
	if (!panelType) {
		return
	}
	return createPanelPath(type, "home")
}

export function createPanelPath(type, action) {
	return `panels-${type}-${action}`
}
