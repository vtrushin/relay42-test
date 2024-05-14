import React from 'react'
import { TextInput } from '../../../text-input/text-input.tsx'
import { FormField } from '../../../form-fields/form-field.tsx'
import { Select } from '../../../select/select.tsx'
import { FormProvider, useForm } from 'react-hook-form'
import { FieldLine } from '../../../fields-line/field-line.tsx'
import { FieldsGroup } from '../../../fields-group/fields-group.tsx'
import { Member, MissionEdit } from '../../../../types/types.ts'
import { Submit } from '../../../submit/submit.tsx'
import { MemberLines } from '../member-lines/member-lines.tsx'
import { ErrorMessage } from '@hookform/error-message'
import { Dictionary } from '../../../../types/types.ts'
import { Button } from '../../../button/button.tsx'
import { Stack } from '../../../stack/stack.tsx'
import { formatToDateFormField } from '../../../../formatters/date.ts'
import { addDays } from 'date-fns'

type MissionEditFormRawProps = {
	mode: 'create' | 'edit'
	formData: MissionEdit | null
	onSubmit: (formData: MissionEdit) => void
	onCancel: () => void
	engineerJobs: Dictionary[]
	destinations: Dictionary[]
}

export const MissionEditFormRaw: React.FC<MissionEditFormRawProps> = ({
	mode,
	formData,
	onSubmit,
	onCancel,
	engineerJobs,
	destinations,
}) => {
	const pilotMembers: Member[] = formData?.members?.some((member) => member.type === 'pilot')
		? []
		: [{ type: 'pilot', experience: 10 }]

	const passengerMembers: Member[] = formData?.members?.some((member) => member.type === 'pilot')
		? []
		: [{ type: 'passenger', age: 18, wealth: 0 }]

	const defaultMembers: Member[] = [...(formData?.members ?? []), ...pilotMembers, ...passengerMembers]

	const methods = useForm<MissionEdit>({
		defaultValues: {
			...formData,
			members: defaultMembers,
			departure: formatToDateFormField(addDays(new Date(), 1))
		},
		shouldUnregister: true,
	})

	const { register, handleSubmit } = methods

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} data-testid='mission-edit-form'>
				<FieldsGroup>
					<FieldLine>
						<FormField label='Name'>
							<TextInput {...register('name', {
								required: 'Should be a name'
							})} />
							<ErrorMessage
								name='name'
								render={({ message }) => <div className="error-text smaller-text">{message}</div>}
							/>
						</FormField>
						<FormField label='Destination'>
							<Select {...register('destination')}>
								{destinations.map(({ id, label }) => (
									<option key={id} value={id}>{label}</option>
								))}
							</Select>
						</FormField>
						<FormField label='Departure'>
							<TextInput type='date' {...register('departure', {
								required: 'Incorrect format'
							})} />
							<ErrorMessage
								name='date'
								render={({ message }) => <div className="error-text smaller-text">{message}</div>}
							/>
						</FormField>
					</FieldLine>
					<MemberLines engineerJobs={engineerJobs} />
					<Stack direction='row' gap='20px'>
						<Submit>
							{mode === 'create' ? 'Add mission' : 'Update mission'}
						</Submit>
						<Button onClick={onCancel} data-testid='cancel-button'>Cancel</Button>
					</Stack>
				</FieldsGroup>
			</form>
		</FormProvider>
	)
}
