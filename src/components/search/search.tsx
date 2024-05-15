import React from 'react'
import { debounce } from '../../helpers/debounce.ts'
import styles from './search.module.css'

type SearchProps = {
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Search: React.FC<SearchProps> = ({ onChange }) => {
	const handleChange = React.useMemo(
		() => debounce(onChange, 300),
		[onChange],
	)

	return (
		<div className={styles.search} data-testid="search">
			<input onChange={handleChange} />
			<div className={styles.icon}>🔎</div>
		</div>
	)
}
