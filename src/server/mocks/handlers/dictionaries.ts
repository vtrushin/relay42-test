import { http, HttpResponse } from 'msw'

type Dictionary = {
	id: string
	label: string
}

const createDictionaryHandler = (name: string, dictionaryHandler: () => Dictionary[]) => {
	return http.get(`/api/dictionaries/${name}`, () =>
		HttpResponse.json(dictionaryHandler())
	)
}

export const getDestinationsHandler = createDictionaryHandler('destinations', () => [
	{ id: 'marsAlpha110', label: 'Mars Alpha-110' },
	{ id: 'marsAlpha116', label: 'Mars Alpha-116' },
	{ id: 'marsAlpha220', label: 'Mars Alpha-220' },
	{ id: 'marsAlpha224', label: 'Mars Alpha-224' },
])

export const getEngineerJobsHandler = createDictionaryHandler('engineerJobs', () => [
	{ id: 'navigation', label: 'Navigation' },
	{ id: 'solarPanels', label: 'Solar panels' },
	{ id: 'maintenance', label: 'Maintenance' },
	{ id: 'mechanics', label: 'Mechanics' },
])

export const dictionariesHandlers = [
	getDestinationsHandler,
	getEngineerJobsHandler
]
