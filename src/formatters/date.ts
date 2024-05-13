import { format, differenceInDays } from 'date-fns'

export const formatDate = (date: Date) => format(date, 'd MMM yyyy')

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
	style: 'short',
	numeric: 'auto'
});

export const formatRelativeDate = (date: Date) => {
	const diff = differenceInDays(date, new Date)
	return relativeTimeFormatter.format(diff, 'day')
}

export const formatToDateFormField = (date: Date) => format(date, 'yyyy-MM-dd')
