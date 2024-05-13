import React from 'react'
import styles from './text-input.module.css'

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
	return <input {...props} className={styles.textInput} ref={ref} />
})
