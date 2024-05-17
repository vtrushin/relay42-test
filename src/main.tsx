import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import './main.css'
import { router } from './router.tsx'
import { installMocks } from './server/mocks/installMocks.ts'

await installMocks()

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
})

const rootEl: HTMLDivElement = document.querySelector('#root')!

ReactDOM.createRoot(rootEl).render(
	<QueryClientProvider client={queryClient}>
		<Toaster />
		<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
	</QueryClientProvider>,
)
