import { QueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMission, getMissions } from './missions.ts'
import { getDestinations, getEngineerJobs } from './dictionaries.ts'

export const useMissions = ({ search }: { search: string }) => useQuery({
	queryKey: ['missions', { search }],
	queryFn: () => getMissions({ search })
})

export const missionKey = (missionId: string) => ['mission', missionId]

export const useMission = (missionId: string, options: { enabled?: boolean } = {}) => useQuery({
	queryKey: missionKey(missionId),
	queryFn: () => getMission(missionId),
	...options
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
