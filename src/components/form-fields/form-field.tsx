import React from 'react'
import styles from './form-fields.module.css'

type FormFieldProps = React.PropsWithChildren<{
	label: React.ReactNode
}>

export const FormField: React.FC<FormFieldProps> = ({
	label,
	children,
}) => (
	<div className={styles.formField}>
		<div className='smaller-text'>{label}</div>
		<div>{children}</div>
	</div>
)

