import { Mission, MissionEdit, MissionListItem, ResponseWrapper } from '../types/types.ts'
import { requestJson } from './request.ts'

export const getMissions = ({ search }: { search: string }) =>
	requestJson<MissionListItem[]>(`/api/missions?search=${search}`)

export const getMission = (missionId: string) => requestJson<Mission>(`/api/missions/${missionId}`)

export const addMission = (body: MissionEdit) => requestJson<ResponseWrapper<{ id: string }>>(`/api/missions`, {
	method: 'POST',
	body: JSON.stringify(body)
})

export const updateMission = (missionId: string, body: MissionEdit) =>
	requestJson<ResponseWrapper<{ id: string }>>(`/api/missions/${missionId}`, {
		method: 'POST',
		body: JSON.stringify(body)
	})
