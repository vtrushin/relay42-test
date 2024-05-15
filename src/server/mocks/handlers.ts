import { RequestHandler } from 'msw'
import { dictionariesHandlers } from './handlers/dictionaries.ts'
import { missionsHandlers } from './handlers/missions.ts'

export const handlers: RequestHandler[] = [
	...missionsHandlers,
	...dictionariesHandlers,
]
