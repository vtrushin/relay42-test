import globals from 'globals'
import esLint from '@eslint/js'
import tsEsLint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

export default [
	{ settings: { react: { version: 'detect' } } },
	{
		rules: {
			'no-console': 'error',
		},
	},
	{ languageOptions: { globals: globals.browser } },
	esLint.configs.recommended,
	...tsEsLint.configs.recommended,
	pluginReactConfig,
]
