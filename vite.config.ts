import { defineConfig } from 'vite'

module.exports = defineConfig({
	publicDir: 'public',
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
	},
	server: {
		port: 5173,
	},
})
