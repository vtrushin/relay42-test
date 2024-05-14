import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvalidateMission, useMission } from '../../api/query.ts'
import { MissionEditForm } from '../../components/mission-edit-form/mission-edit-form.tsx'
import { updateMission } from '../../api/missions.ts'
import { MissionEdit } from '../../types/types.ts'
import { routes } from '../../router.tsx'
import { toast } from 'react-hot-toast'

export const Edit: React.FC = () => {
	const navigate = useNavigate()
	const { id: missionId } = useParams()
	const invalidateMission = useInvalidateMission()

	if (!missionId) {
		return (
			<div>There is no such mission</div>
		)
	}

	const { data: mission, isLoading: missionIsLoading } = useMission(missionId)

	const handleSubmit = async (formData: MissionEdit) => {
		try {
			await updateMission(missionId, formData)
			toast.success('Mission has updated', {
				duration: 2000
			})
			await invalidateMission(missionId)
			navigate(routes.root)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const handleCancel = () => {
		navigate(routes.root)
	}

	if (missionIsLoading) {
		return <div>Loading...</div>
	}

	if (!mission) {
		return <div>Loading error</div>
	}

	return (
		<div>
			<h1>Mission "<span data-testid='mission-title'>{mission?.name}</span>"</h1>
			<MissionEditForm
				mode='edit'
				formData={mission}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</div>
	)
}
