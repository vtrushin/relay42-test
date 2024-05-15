import React from 'react'
import styles from './stack.module.css'

type StackProps = React.PropsWithChildren<{
	direction: 'row' | 'column'
	gap: string
}>

export const Stack: React.FC<StackProps> = ({ direction, gap, children }) => (
	<div
		className={styles.stack}
		style={
			{ '--direction': direction, '--gap': gap } as React.CSSProperties
		}
	>
		{children}
	</div>
)
