import { Whale } from "@models/Whale"

let whaleMap = new Map()

export async function createWhale(name) {
	const whaleObj = new Whale({ name })
	await whaleObj.save()
	await validateWhale(whaleObj)
	whaleMap.set(name, whaleObj)
	return whaleObj
}
export async function getWhaleArr(){
	return whaleMap.values()
}

export async function getWhale(name){
	let whaleObj = whaleMap.get(name)
	if (!whaleObj){
		await validateWhale(name)
		whaleObj = whaleMap.get(name)
	}
	return whaleObj
}

async function validateWhale(whaleObj){

	if (whaleMap.size > 0) {
		return
	} 
	if (!(whaleObj instanceof Object)) {
		whaleObj = await Whale.findOne({whaleObj})
	}
	if (!whaleObj) {
		return
	}
	const { name } = whaleObj
	const whaleDataArr = await Whale.find({})
	if (whaleDataArr.length == 0) {
		whaleMap.set(name, whaleObj)
		return
	}
	const whaleArr = []
	whaleDataArr.forEach(whale => {
		const { name } = whale 
		whaleArr.push([name, whale])
	})
	whaleMap = new Map(whaleArr)
}
