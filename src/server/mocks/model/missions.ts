import { genId } from '../helpers/gen-id.ts'
import { MemberType, Mission, MissionEdit, MissionListItem } from '../../../types/types.ts'

export const missions: Mission[] = [
	{
		id: genId(),
		name: `Expedition 1`,
		destination: 'marsAlpha110',
		departure: '2021-11-21',
		members: [
			{ type: 'pilot', experience: 10 },
			{ type: 'engineer', job: 'mechanics', experience: 10 },
			{ type: 'passenger', age: 20, wealth: 20_000 },
		]
	},
	{
		id: genId(),
		name: `Expedition 2`,
		destination: 'marsAlpha116',
		departure: '2024-10-18',
		members: [
			{ type: 'pilot', experience: 12 },
			{ type: 'engineer', job: 'solarPanels', experience: 10 },
			{ type: 'engineer', job: 'navigation', experience: 2 },
			{ type: 'passenger', age: 18, wealth: 10_000 },
			{ type: 'passenger', age: 40, wealth: 5_000 },
		]
	}
]

export const getMissions = ({ search = '' }: { search: string }): MissionListItem[] => {
	const memberTypes: MemberType[] = ['pilot', 'engineer', 'passenger']
	return missions
		.filter(mission => mission.name.includes(search))
		.map(mission => {
			const members = memberTypes.map(memberType => ({
				type: memberType,
				count: mission.members.filter(member => member.type === memberType).length,
			}))
			return ({ ...mission, members })
		})
}

export const getMission = (missionId: string) =>
	missions.find(mission => mission.id === missionId)

export const addMission = (mission: MissionEdit) => {
	const id = genId()
	missions.push({
		id,
		...mission
	})
	return id
}

export const updateMission = (id: string, mission: MissionEdit) => {
	const oldMissionIndex = missions.findIndex(mission => mission.id === id)
	const oldMission = missions[oldMissionIndex]
	missions.splice(oldMissionIndex, 1, {
		id: oldMission.id,
		...mission
	})
}
