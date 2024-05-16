import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/_layout.tsx'

export const routes = {
	root: '/',
	add: '/add',
	edit: '/edit/:id',
} as const

export const router = createBrowserRouter([
	{
		path: routes.root,
		element: <Layout />,
		children: [
			{
				index: true,
				lazy: () =>
					import('./pages/index').then((module) => ({
						Component: module.Index,
					})),
			},
			{
				path: routes.add,
				lazy: () =>
					import('./pages/add').then((module) => ({
						Component: module.Create,
					})),
			},
			{
				path: routes.edit,
				lazy: () =>
					import('./pages/edit').then((module) => ({
						Component: module.Edit,
					})),
			},
			{
				path: '*',
				lazy: () =>
					import('./pages/no-match').then((module) => ({
						Component: module.NoMatch,
					})),
			},
		],
	},
])
