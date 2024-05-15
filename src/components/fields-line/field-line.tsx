import React from 'react'
import styles from './fields-line.module.css'

type FieldsLineProps = React.PropsWithChildren

export const FieldLine: React.FC<FieldsLineProps> = ({ children }) => {
	return <div className={styles.fieldLine}>{children}</div>
}
