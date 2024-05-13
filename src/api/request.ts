export const request = async (url: string, init?: RequestInit) => {
	let response
	try {
		response = await fetch(url, init)
	} catch (error) {
		throw new Error(String(error))
	}
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	return response
}

export const requestJson = <Response>(url: string, init?: RequestInit) =>
	request(url, init).then(response => response.json() as Response)
