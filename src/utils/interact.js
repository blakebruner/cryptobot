export function getModalValues(interaction) {
	const { fields: { fields } } = interaction
	return Object.fromEntries(fields.filter(({ value }) => value).mapValues(({ value }) => value))
}