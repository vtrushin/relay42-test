import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { addMission } from '../../api/missions.ts'
import { useInvalidateMissions } from '../../api/query.ts'
import { MissionEditForm } from '../../components/mission-edit-form/mission-edit-form.tsx'
import { routes } from '../../router.tsx'
import { MissionEdit } from '../../types/types.ts'

export const Create: React.FC = () => {
	const navigate = useNavigate()
	const invalidateMissions = useInvalidateMissions()

	const handleSubmit = async (formData: MissionEdit) => {
		try {
			await addMission(formData)
			toast.success('Mission has added')
			await invalidateMissions()
			navigate(routes.root)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const handleCancel = () => {
		navigate(routes.root)
	}

	return (
		<div>
			<h1>New mission</h1>
			<MissionEditForm
				mode="create"
				formData={null}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</div>
	)
}
