import { installMocks } from './server/mocks/installMocks.ts'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './main.css'

await installMocks()

const queryClient = new QueryClient()

const rootEl: HTMLDivElement = document.querySelector('#root')!
ReactDOM.createRoot(rootEl).render(
	<QueryClientProvider client={queryClient}>
		<Toaster />
		<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
	</QueryClientProvider>
)


