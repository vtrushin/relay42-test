import React from 'react'
import styles from './fields-group.module.css'

type FieldsGroupProps = React.PropsWithChildren<{
	title?: React.ReactNode
}>

export const FieldsGroup: React.FC<FieldsGroupProps> = ({
	title,
	children,
}) => {
	return (
		<div className={styles.fieldsGroup}>
			{title}
			<div className={styles.fieldsGroupBody}>{children}</div>
		</div>
	)
}
