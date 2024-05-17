import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getDestinations, getEngineerJobs } from './dictionaries.ts'
import { getMission, getMissions } from './missions.ts'

export const useMissions = ({ search }: { search: string }) =>
	useQuery({
		queryKey: ['missions', { search }],
		queryFn: () => getMissions({ search }),
	})

export const useInvalidateMissions = () => {
	const queryClient = useQueryClient()
	return () =>
		queryClient.invalidateQueries({
			queryKey: ['missions'],
		})
}

export const getMissionKey = (missionId: string) => ['mission', missionId]

export const useMission = (
	missionId: string,
	options: { enabled?: boolean } = {},
) =>
	useQuery({
		queryKey: getMissionKey(missionId),
		queryFn: () => getMission(missionId),
		...options,
	})

export const useInvalidateMission = () => {
	const queryClient = useQueryClient()
	const invalidateMissions = useInvalidateMissions()
	return async (missionId: string) => {
		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: getMissionKey(missionId),
			}),
			invalidateMissions(),
		])
	}
}

export const useEngineerJobs = () =>
	useQuery({
		queryKey: ['engineerJobs'],
		queryFn: () => getEngineerJobs(),
	})

export const useDestinations = () =>
	useQuery({
		queryKey: ['destinations'],
		queryFn: () => getDestinations(),
	})
