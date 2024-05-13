import React from 'react'
import styles from './submit.module.css'

type SubmitProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Submit = React.forwardRef<HTMLButtonElement, SubmitProps>
(({ children, ...restProps }, ref) => (
	<button {...restProps} type='submit' className={styles.submit} ref={ref} data-testid='submit'>
		{children}
	</button>
))
