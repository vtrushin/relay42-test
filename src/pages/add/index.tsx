import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MissionEditForm } from '../../components/mission-edit-form/mission-edit-form.tsx'
import { routes } from '../../router.tsx'
import { MissionEdit } from '../../types/types.ts'
import { addMission } from '../../api/missions.ts'
import { toast } from 'react-hot-toast'

export const Create: React.FC = () => {
	const navigate = useNavigate()

	const handleSubmit = async (formData: MissionEdit) => {
		try {
			await addMission(formData)
			toast.success('Mission has added')
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
				mode='create'
				formData={null}
				onSubmit={handleSubmit}
				onCancel={handleCancel}
			/>
		</div>
	)
}
