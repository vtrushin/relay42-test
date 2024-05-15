import React from 'react'
import styles from './select.module.css'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ children, ...restProps }, ref) => (
		<div className={styles.select}>
			<select {...restProps} ref={ref}>
				{children}
			</select>
		</div>
	),
)

Select.displayName = 'Select'
