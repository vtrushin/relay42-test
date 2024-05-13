import React from 'react'
import styles from './select.module.css'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ children, ...restProps }, ref) => {
	return (
		<div className={styles.select}>
			<select {...restProps} ref={ref}>
				{children}
			</select>
		</div>
	)
	// return <input {...props} className={styles.textInput} />
})
