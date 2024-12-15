import { Wallet } from "@models/Wallet"
import { WALLET } from "@main/config"

// -- cache
export const currencyArr = WALLET.currencies
export const currencyMap = parseCurrency(currencyArr)

// -- lazy load
let walletCache = new Map()

export async function createWallet(address, currency, observed) {
	// await ensureWalletCache()
	if (walletCache.has(address)) {
		// already exists
		return
	}
	const wallet = new Wallet({ address, currency, observed: observed._id })
	await wallet.save()
	// walletCache.set(address, currency)
	return wallet
}

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
