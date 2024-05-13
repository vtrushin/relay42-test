import React, { Fragment } from 'react'
import { FormField } from '../../../form-fields/form-field.tsx'
import { Select } from '../../../select/select.tsx'
import { TextInput } from '../../../text-input/text-input.tsx'
import { Button } from '../../../button/button.tsx'
import { useFormContext } from 'react-hook-form'
import { EngineerMember, Member, MissionEdit } from '../../../../types/types.ts'
import { ErrorMessage } from '@hookform/error-message'
import { Dictionary } from '../../../../types/types.ts'

type MemberProps = {
	index: number
	onDelete: () => void
	engineerJobs: Dictionary[]
	selectedPilotsNumber: number
	selectedEngineerJobs: Set<EngineerMember['job']>
}

export const MemberLine: React.FC<MemberProps> = ({
	index,
	onDelete,
	engineerJobs,
	selectedPilotsNumber,
	selectedEngineerJobs,
}) => {
	const { register, formState: { errors }, watch } = useFormContext<MissionEdit>()
	const type = watch(`members.${index}.type`)

	const canSelectPilot = selectedPilotsNumber === 0
	const canSelectEngineer = selectedEngineerJobs.size < engineerJobs.length
	const canDelete = type !== 'pilot'

	const fields: Record<Member['type'], () => React.ReactNode> = React.useMemo(() => ({
		pilot: () => (
			<Fragment key="pilot">
				<FormField label="Experience">
					<TextInput
						defaultValue={10}
						{...register(`members.${index}.experience`, {
							min: { value: 10, message: 'At least 10' }
						})}
						type="number"
						style={{ width: 100 }}
					/>
					<ErrorMessage
						errors={errors}
						name={`members.${index}.experience`}
						render={({ message }) => <div className="error-text smaller-text" data-testid='error'>{message}</div>}
					/>
				</FormField>
			</Fragment>
		),
		engineer: () => (
			<Fragment key='engineer'>
				<FormField label='Experience'>
					<TextInput
						defaultValue={0}
						{...register(`members.${index}.experience`, {
							required: 'Required'
						})}
						type='number'
						style={{ width: 100 }}
					/>
					<ErrorMessage
						errors={errors}
						name={`members.${index}.experience`}
						render={({ message }) => <div className="error-text smaller-text" data-testid='error'>{message}</div>}
					/>
				</FormField>
				<FormField label='Job'>
					<Select {...register(`members.${index}.job`)}>
						{engineerJobs.map(({ id, label }) => (
							<option
								key={id}
								value={id}
								disabled={selectedEngineerJobs.has(id)}
							>
								{label}
							</option>
						))}
					</Select>
				</FormField>
			</Fragment>
		),
		passenger: () => (
			<Fragment key='passenger'>
				<FormField label='Age'>
					<TextInput
						defaultValue={18}
						{...register(`members.${index}.age`, {
							required: 'Required',
							min: { value: 1, message: 'Min is 1' }
						})}
						type='number'
						style={{ width: 100 }}
					/>
					<ErrorMessage
						errors={errors}
						name={`members.${index}.age`}
						render={({ message }) => <div className="error-text smaller-text" data-testid='error'>{message}</div>}
					/>
				</FormField>
				<FormField label='Wealth'>
					<TextInput
						defaultValue={0}
						{...register(`members.${index}.wealth`, {
							required: 'Required'
						})}
						type='number'
						style={{ width: 100 }}
					/>
				</FormField>
			</Fragment>
		)
	}), [index, register, errors, selectedEngineerJobs])

	return (
		<>
			<FormField label='Type'>
				<Select {...register(`members.${index}.type`)} disabled={!canDelete}>
					<option value='pilot' disabled={!canSelectPilot}>👨‍✈️ Pilot</option>
					<option value='engineer' disabled={!canSelectEngineer}>👷‍♂️ Engineer</option>
					<option value='passenger'>🙎‍♂️ Passenger</option>
				</Select>
			</FormField>
			{type ? fields[type]() : null}
			{canDelete ?
				<Button
					onClick={onDelete}
					style={{ marginTop: 22 }}
					data-testid={`delete-button delete-button-${index}`}
				>❌</Button>
				: null
			}
		</>
	)
}
