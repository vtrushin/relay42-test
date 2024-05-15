import { Dictionary } from '../types/types.ts'
import { requestJson } from './request.ts'

const requestDictionary = (name: string) =>
	requestJson<Dictionary[]>(`/api/dictionaries/${name}`)

export const getDestinations = () => requestDictionary('destinations')

export const getEngineerJobs = () => requestDictionary('engineerJobs')
