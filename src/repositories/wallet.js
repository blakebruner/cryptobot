import { Wallet } from "@models/Wallet"
import { CURRENCY_MAP, CURRENCY_ARR } from "@utils/parsed"

export function getCurrency(currency) {
	return CURRENCY_MAP.get(currency)
}

export function getCurrencyArr() {
	return CURRENCY_ARR
}
