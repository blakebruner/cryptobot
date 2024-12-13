import { Whale } from "@models/Whale"

export async function createWhale(name) {
	const whale = new Whale({ name })
	await whale.save()
	return whale
}