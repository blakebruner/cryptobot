import { CURRENCY_MAP } from "@utils/parsed"

export function getCurrency(currency) {
	return CURRENCY_MAP.get(currency)
}
