import React from 'react'
import { toast } from 'react-hot-toast'

export const useRequestStateToast = ({
	isFetching,
	isError
}: {
	isFetching?: boolean
	isError?: string | boolean
}) => {
	const loadingToastId = React.useRef<string>()

	React.useEffect(() => {
		if (isFetching) {
			loadingToastId.current = toast.loading('Loading...')
		} else if (loadingToastId.current) {
			toast.dismiss(loadingToastId.current)
		}
	}, [isFetching])

	React.useEffect(() => {
		if (isError) {
			toast.error('Loading error', {
				duration: Infinity
			})
		}
	}, [isError])
}
