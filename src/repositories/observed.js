import { Observed } from "@models/Observed"

// blockdaemon.com

let obsMap = new Map()
export let obsArr = []

export async function createObserved(name) {
	await initObservedMap()
	const obsObj = new Observed({ name })
	await obsObj.save()
	obsMap.set(name, obsObj)
	obsArr.push(formatObsChoice(obsObj))
	return obsObj
}

export async function getObserved(name) {
	await initObservedMap()
	return obsMap.get(name)
}

function formatObsChoice(obsObj) {
	const { name } = obsObj
	return {
		name,
		value: name,
	}
}

async function initObservedMap() {
	if (obsMap.size > 0) {
		return
	}
	const obsDataArr = await Observed.find({})
	if (obsDataArr.length == 0) {
		return
	}
	const obsMapLocal = new Map()
	const obsArrLocal = []
	obsDataArr.forEach(obs => {
		const { name } = obs
		obsMapLocal.set(name, obs)
		obsArrLocal.push(formatObsChoice(obs))
	})
	obsMap = obsMapLocal
	obsArr = obsArrLocal
}
