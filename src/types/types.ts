export type Dictionary = {
	id: string
	label: string
}

export type ResponseWrapper<Payload> = {
	success: boolean
	payload: Payload
	error: string
}

export type MemberType = 'pilot' | 'engineer' | 'passenger'

export type MissionListItem = {
	id: string
	name: string
	destination: string
	departure: string
	members: { type: MemberType; count: number }[]
}

export type PilotMember = {
	type: 'pilot'
	experience: number
}

export type PassengerMember = {
	type: 'passenger'
	age: number
	wealth: number
}

export type EngineerMember = {
	type: 'engineer'
	experience: number
	job: string
}

export type Member = PilotMember | PassengerMember | EngineerMember

export type Mission = {
	id: string
	name: string
	destination: string
	departure: string
	members: Member[]
}

export type MissionEdit = Omit<Mission, 'id'>
