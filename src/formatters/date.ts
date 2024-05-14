import { format } from 'date-fns'

export const formatDate = (date: Date) => format(date, 'd MMM yyyy')

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
	style: 'short',
	numeric: 'auto'
})

export const formatRelativeDate = (diff: number) => {
	return relativeTimeFormatter.format(diff, 'day')
}

export const formatToDateFormField = (date: Date) => format(date, 'yyyy-MM-dd')
