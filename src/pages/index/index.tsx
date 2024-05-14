import React from 'react'
import { Mission } from './_components/mission/mission.tsx'
import { NewMission } from './_components/new-mission/new-mission.tsx'
import { useMissions } from '../../api/query.ts'
import styles from './index.module.css'
import { toast } from 'react-hot-toast'
import { Search } from '../../components/search/search.tsx'

export const Index: React.FC = () => {
	const [search, setSearch] = React.useState('')
	const id = React.useRef<string>()
	const { data: missions, isFetching: missionsIsFetching, error: missionsError } = useMissions({ search })

	React.useEffect(() => {
		if (missionsIsFetching) {
			id.current = toast.loading('Loading...')
		} else if (id.current) {
			toast.dismiss(id.current)
		}
	}, [missionsIsFetching])

	React.useEffect(() => {
		if (missionsError) {
			toast.error('Loading error', {
				duration: Infinity
			})
		}
	}, [missionsError])

	const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}, [])

	return (
		<div>
			<h1>Missions</h1>
			<Search onChange={handleSearch} />
			<p></p>
			{missions ? (
				<div className={styles.missionList}>
					{missions.map(mission => (
						<Mission
							key={mission.id}
							mission={mission}
						/>
					))}
					<NewMission />
				</div>
			) : null}
		</div>
	)
}
