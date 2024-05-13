const { defineConfig } = require('vite')

module.exports = defineConfig({
	publicDir: 'assets',
	css: {
		modules: {
			localsConvention: 'camelCase'
		}
	},
	server: {
		port: '5173'
	}
})
