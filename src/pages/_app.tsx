import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

// internal imports
import 'styles/globals.css';
import 'styles/main.scss';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 20,
		},
	},
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-center">
				{(t) => (
					<ToastBar toast={t}>
						{({ icon, message }) => (
							<>
								{icon}
								{message}
								<button
									className="text-sm pr-1 font-medium !rounded-none border-y-0 border-r-0 ml-1"
									onClick={() => toast.dismiss(t.id)}
								>
									Close
								</button>
							</>
						)}
					</ToastBar>
				)}
			</Toaster>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
