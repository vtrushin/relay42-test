import React from 'react'
import styles from './button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>
(({ children, ...restProps }, ref) => (
	<button {...restProps} type='button' className={styles.button} ref={ref}>
		{children}
	</button>
))
