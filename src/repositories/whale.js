import { Whale } from "@models/Whale"

// blockdaemon.com

let whaleMap = new Map()
export let whaleArr = []

export async function createWhale(name) {
	await initWhaleMap()
	const whaleObj = new Whale({ name })
	await whaleObj.save()
	whaleMap.set(name, whaleObj)
	whaleArr.push(formatWhaleChoice(whaleObj))
	return whaleObj
}

export async function getWhale(name) {
	await initWhaleMap()
	return whaleMap.get(name)
}

function formatWhaleChoice(whaleObj) {
	const { name } = whaleObj
	return {
		name,
		value: name,
	}
}

async function initWhaleMap() {
	if (whaleMap.size > 0) {
		return
	}
	const whaleDataArr = await Whale.find({})
	if (whaleDataArr.length == 0) {
		return
	}
	const whaleMapLocal = new Map()
	const whaleArrLocal = []
	whaleDataArr.forEach(whale => {
		const { name } = whale
		whaleMapLocal.set(name, whale)
		whaleArrLocal.push(formatWhaleChoice(whale))
	})
	whaleMap = whaleMapLocal
	whaleArr = whaleArrLocal
}
