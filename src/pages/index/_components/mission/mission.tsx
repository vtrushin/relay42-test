import React from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { generatePath, Link } from 'react-router-dom'
import { formatDate, formatRelativeDate } from '../../../../formatters/date.ts'
import { routes } from '../../../../router.tsx'
import { MissionListItem } from '../../../../types/types.ts'
import { useDestinations } from '../../../../api/query.ts'
import styles from './mission.module.css'

type MemberType = 'pilot' | 'engineer' | 'passenger'

type MissionProps = {
	mission: MissionListItem
}

const memberDict = {
	pilot: '👨‍✈️',
	engineer: '👷‍♂️',
	passenger: '🙎‍♂️'
} satisfies Record<MemberType, string>

export const Mission: React.FC<MissionProps> = ({ mission }) => {
	const { data: destinations, isFetching: destinationsIsFetching } = useDestinations()

	if (destinationsIsFetching) {
		return null
	}

	const destinationLabel = destinations
		?.find(destination => destination.id === mission.destination)?.label ?? null

	const href = generatePath(routes.edit, { id: mission.id })
	const departure = new Date(mission.departure)
	const diffDate = differenceInCalendarDays(departure, new Date())

	return (
		<Link to={href} className={styles.mission} data-testid={`mission mission-${mission.id}`}>
			<h2 data-testid='name'>{mission.name}</h2>
			<div className={styles.missionBody}>
				<div className={styles.destination} data-testid='destination'>
					{destinationLabel}
				</div>
				<div className={styles.members} data-testid='members'>
					{mission.members.map((member) => (
						<span key={member.type}>
							<span>{memberDict[member.type]}</span>
							&nbsp;
							<span data-testid={`member-${member.type}-count`}>{member.count}</span>
						</span>
					))}
				</div>
				<div className='smaller-text' data-testid='departure'>
					{formatDate(departure)}
					<span className={styles.delimiter}> • </span>
					<span className={Math.abs(diffDate) === 0 ? styles.departed : ''}>
						{formatRelativeDate(diffDate)}
					</span>
				</div>
			</div>
		</Link>
	)
}
