import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routers/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<HelmetProvider>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<div className='max-w-screen-xl mx-auto'>
					<RouterProvider router={router} />
				</div>
			</QueryClientProvider>
		</AuthProvider>
	</HelmetProvider>
);
