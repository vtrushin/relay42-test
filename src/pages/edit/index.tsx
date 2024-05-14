import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useInvalidateMission, useMission } from '../../api/query.ts'
import { MissionEditForm } from '../../components/mission-edit-form/mission-edit-form.tsx'
import { updateMission } from '../../api/missions.ts'
import { MissionEdit } from '../../types/types.ts'
import { routes } from '../../router.tsx'
import { toast } from 'react-hot-toast'
import { useRequestStateToast } from '../../hooks/useRequestStateToast.ts'

export const Edit: React.FC = () => {
	const navigate = useNavigate()
	const { id: missionId } = useParams<{ id: string }>()
	const invalidateMission = useInvalidateMission()

	const {
		data: mission,
		isFetching: missionIsFetching,
		error: missionError
	} = useMission(missionId!, { enabled: Boolean(missionId) })

	useRequestStateToast({
		isFetching: missionIsFetching,
		isError: missionError ? missionError.message : false
	})

	const handleSubmit = async (formData: MissionEdit) => {
		try {
			await updateMission(missionId!, formData)
			toast.success(`Mission "${formData.name}" updated`, {
				duration: 2000
			})
			await invalidateMission(missionId!)
			navigate(routes.root)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const handleCancel = () => {
		navigate(routes.root)
	}

	if (!missionId) {
		navigate(routes.root)
		return null
	}

	return mission ? (
		<div>
			<h1>Mission "<span data-testid='mission-title'>{mission?.name}</span>"</h1>
			<MissionEditForm
				mode='edit'
				formData={mission}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</div>
	) : null
}
