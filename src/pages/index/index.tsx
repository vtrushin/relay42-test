import React from 'react'
import { useMissions } from '../../api/query.ts'
import { Search } from '../../components/search/search.tsx'
import { useRequestStateToast } from '../../hooks/useRequestStateToast.ts'
import { Mission } from './_components/mission/mission.tsx'
import { NewMission } from './_components/new-mission/new-mission.tsx'
import styles from './index.module.css'

export const Index: React.FC = () => {
	const [search, setSearch] = React.useState('')
	const {
		data: missions,
		isFetching: missionsIsFetching,
		error: missionsError,
	} = useMissions({ search })

	useRequestStateToast({
		isFetching: missionsIsFetching,
		isError: missionsError ? missionsError.message : false,
	})

	const handleSearch = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(event.target.value)
		},
		[],
	)

	return (
		<div>
			<h1>Missions</h1>
			<Search onChange={handleSearch} />
			<p></p>
			{missions ? (
				<div className={styles.missionList}>
					{missions.map((mission) => (
						<Mission key={mission.id} mission={mission} />
					))}
					<NewMission />
				</div>
			) : null}
		</div>
	)
}
