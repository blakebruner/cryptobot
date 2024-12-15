import { PANELS } from "@main/config"

// -- cache
export const panelArr = Object.keys(PANELS)

export function getPanel(type) {
	return PANELS[type]
}

export function getPanelActions(type) {
	return PANELS[type].actionList
}
