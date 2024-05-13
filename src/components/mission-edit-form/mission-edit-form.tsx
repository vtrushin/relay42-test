import React from 'react'
import { MissionEdit } from '../../types/types.ts'
import { MissionEditFormRaw } from './components/mission-edit-form-raw/mission-edit-form-raw.tsx'
import { useDestinations, useEngineerJobs } from '../../api/query.ts'

type MissionEditFormRawProps = {
	mode: 'create' | 'edit'
	formData: MissionEdit | null
	onSubmit: (formData: MissionEdit) => void
	onCancel: () => void
}

export const MissionEditForm: React.FC<MissionEditFormRawProps> = (props) => {
	const { data: engineerJobs } = useEngineerJobs()
	const { data: destinations } = useDestinations()

	if (!engineerJobs || !destinations) {
		return <p>Loading...</p>
	}

	return (
		<MissionEditFormRaw
			{...props}
			engineerJobs={engineerJobs}
			destinations={destinations}
		/>
	)
}
