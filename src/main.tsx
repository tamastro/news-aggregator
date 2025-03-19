import React from 'react';
import ReactDOM from 'react-dom/client';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PreferencesProvider>
				<App />
			</PreferencesProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
