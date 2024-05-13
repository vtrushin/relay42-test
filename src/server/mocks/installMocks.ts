export const installMocks = async () => {
	if (process.env.NODE_ENV !== 'development') {
		return
	}

	const { worker } = await import('./worker.ts')

	return worker.start()
}
