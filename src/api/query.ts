import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMission, getMissions } from './missions.ts'
import { getDestinations, getEngineerJobs } from './dictionaries.ts'

export const missionsKey = ({ search }: { search: string }) => ['mission', { search }]

export const useMissions = ({ search }: { search: string }) => useQuery({
	queryKey: ['missions', { search }],
	queryFn: () => getMissions({ search })
})

// export const invalidateMissions = () => {
// 	const queryClient = useQueryClient()
// 	queryClient.invalidateQueries({ queryKey: missionKey(missionId) })
// }

export const missionKey = (missionId: string) => ['mission', missionId]

export const useMission = (missionId: string) => useQuery({
	queryKey: missionKey(missionId),
	queryFn: () => getMission(missionId)
})

export const useInvalidateMission = () => {
	const queryClient = useQueryClient()
	return (missionId: string) => queryClient.invalidateQueries({ queryKey: missionKey(missionId) })
}

export const useEngineerJobs = () => useQuery({
	queryKey: ['engineerJobs'],
	queryFn: () => getEngineerJobs()
})

export const useDestinations = () => useQuery({
	queryKey: ['destinations'],
	queryFn: () => getDestinations()
})
