export const genId = (() => {
	let i = 0
	return () => {
		i ++
		return String(i)
	}
})()
