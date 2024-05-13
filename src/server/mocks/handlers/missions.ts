import { http, delay, HttpResponse } from 'msw'
import { getMission, addMission, updateMission, getMissions } from '../model/missions.ts'
import { MissionEdit } from '../../../types/types.ts'

export const getMissionsHandler = http.get<{ search: string }>(
	'/api/missions',
	async ({ request }) => {
		const url = new URL(request.url)
		const search = url.searchParams.get('search') ?? ''
		await delay(500)
		return HttpResponse.json(getMissions({ search }))
	}
)

export const getMissionHandler = http.get<{ missionId: string }>(
	'/api/missions/:missionId',
	({ params }) => HttpResponse.json(getMission(params.missionId))
)

export const addMissionHandler = http.post<never, MissionEdit>(
	'/api/missions',
	async ({ request }) => {
		const mission = await request.json()
		const id = addMission(mission)
		return HttpResponse.json({
			success: true,
			payload: { id },
			error: null
		})
	}
)

export const updateMissionHandler = http.post<{ missionId: string }, MissionEdit>(
	'/api/missions/:missionId',
	async ({ params, request }) => {
		const mission = await request.json()
		updateMission(params.missionId, mission)
		return HttpResponse.json({
			success: true,
			payload: {},
			error: null
		})
	}
)

export const missionsHandlers = [
	getMissionsHandler,
	getMissionHandler,
	addMissionHandler,
	updateMissionHandler,
]
