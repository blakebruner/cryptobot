import { Wallet } from "@models/Wallet"
import { WALLET } from "@main/config"

// -- cache
export const currencyArr = WALLET.currencies
export const currencyMap = parseCurrency(currencyArr)

export function getCurrency(currency) {
	return currencyMap.get(currency)
}

export function getCurrencyArr() {
	return currencyArr
}

function parseCurrency(arr) {
	const map = new Map()
	arr.forEach(curr => {
		const { value, ...rest } = curr
		map.set(value, {
			value,
			...rest,
		})
	})
	return map
}
