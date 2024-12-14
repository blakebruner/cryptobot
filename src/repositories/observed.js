import { Observed } from "@models/Observed"

// blockdaemon.com

// lazy load
let observedCache = new Map()

export async function createObserved(name) {
	await ensureObservedCache()
	if (observedCache.has(name)) {
		// already exists
		return
	}
	const observed = new Observed({ name })
	await observed.save()
	observedCache.set(name, observed)
	return observed
}

export async function deleteObserved(name) {
	await ensureObservedCache()
	const observed = observedCache.get(name)
	if (!observed) {
		// does not exist
		return
	}
	await Observed.deleteOne({ name })
	observedCache.delete(name)
}

export async function getObserved(name) {
	await ensureObservedCache()
	return observedCache.get(name)
}

// -- internal functions

async function ensureObservedCache() {
	if (observedCache.size > 0) {
		return
	}
	await populateObservedMap()
}

async function populateObservedMap() {
	const observedDataArr = await Observed.find({})
	if (observedDataArr.length == 0) {
		return
	}
	const mapLocal = new Map()
	observedDataArr.forEach(obs => {
		const { name } = obs
		mapLocal.set(name, obs)
	})
	observedCache = mapLocal
}
