import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FieldLine } from '../../../fields-line/field-line.tsx'
import { MemberLine } from '../member-line/member-line.tsx'
import { Button } from '../../../button/button.tsx'
import { EngineerMember, Member, MissionEdit } from '../../../../types/types.ts'
import { FieldsGroup } from '../../../fields-group/fields-group.tsx'
import { Dictionary } from '../../../../types/types.ts'

type MemberLinesProps = {
	engineerJobs: Dictionary[]
}

export const MemberLines: React.FC<MemberLinesProps> = ({
	engineerJobs
}) => {
	const { control, watch } = useFormContext<MissionEdit>()
	const {
		fields: membersFields,
		append: appendMember,
		remove: removeMember,
	} = useFieldArray<MissionEdit>({
		name: 'members',
		control
	})

	const members = watch('members')

	const selectedPilotsNumber = members
		.filter((member) => member.type === 'pilot').length

	const selectedEngineerJobs = new Set(
		members
			.filter((member) => member.type === 'engineer')
			.map((member) => (member as EngineerMember).job)
	)

	const selectedPassengersNumber = members
		.filter((member) => member.type === 'passenger').length

	const addMember = React.useCallback(() => {
		appendMember({
			type: 'passenger',
		} as Member)
	}, [])

	return (
		<FieldsGroup title={<h2 style={{ margin: 0 }}>Members</h2>}>
			{membersFields.map((field, index) => (
				<FieldLine key={field.id}>
					<MemberLine
						index={index}
						onDelete={() => removeMember(index)}
						selectedPilotsNumber={selectedPilotsNumber}
						selectedPassengersNumber={selectedPassengersNumber}
						engineerJobs={engineerJobs}
						selectedEngineerJobs={selectedEngineerJobs}
					/>
				</FieldLine>
			))}
			<div>
				<Button onClick={addMember} data-testid='add-member'>Add member</Button>
			</div>
		</FieldsGroup>
	)
}
