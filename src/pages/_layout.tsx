import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './_layout.module.css'

export const Layout: React.FC = (props) => {
	return <div className={styles.layout}>
		<Outlet />
	</div>
}
