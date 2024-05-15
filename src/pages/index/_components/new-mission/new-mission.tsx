import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../../router.tsx'
import styles from './new-mission.module.css'

export const NewMission: React.FC = () => {
	return (
		<Link
			to={routes.add}
			className={styles.newMission}
			data-testid="new-mission"
		>
			<div className={styles.rocket}>🚀</div>
			<div className={styles.action}>Add mission</div>
		</Link>
	)
}
