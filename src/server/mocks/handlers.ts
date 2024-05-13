import { RequestHandler } from 'msw'
import { missionsHandlers } from './handlers/missions.ts'
import { dictionariesHandlers } from './handlers/dictionaries.ts'

export const handlers: RequestHandler[] = [
	...missionsHandlers,
	...dictionariesHandlers
]
