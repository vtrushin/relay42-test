import React from 'react'
import { differenceInDays } from 'date-fns'
import { generatePath, Link } from 'react-router-dom'
import { formatDate, formatRelativeDate } from '../../../../formatters/date.ts'
import { routes } from '../../../../router.tsx'
import { MissionListItem } from '../../../../types/types.ts'
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
	const href = generatePath(routes.edit, { id: mission.id })
	const departure = new Date(mission.departure)
	const diffDate = differenceInDays(departure, new Date)

	return (
		<Link to={href} className={styles.mission} data-testid={`mission mission-${mission.id}`}>
			<h2 data-testid='name'>{mission.name}</h2>
			<div className={styles.missionBody}>
				<div className={styles.destination} data-testid='destination'>{mission.destination}</div>
				<div className={styles.members} data-testid='members'>
					{mission.members.map((member) => (
						<span key={member.type}>{memberDict[member.type]} {member.count}</span>
					))}
				</div>
				<div className='smaller-text' data-testid='departure'>
					{formatDate(departure)}
					<span className={styles.delimiter}> • </span>
					{diffDate > 0
						? formatRelativeDate(departure)
						: <span className={styles.departed}>departed</span>
					}
				</div>
			</div>
		</Link>
	)
}
