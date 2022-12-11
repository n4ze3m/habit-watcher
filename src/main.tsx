import "./style.css";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { Layout } from "./Layout";
import { NewHabitPage } from "./new-habit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";
import { ConfettiProvider } from "./hooks/useConfetti";
import { SummaryPage } from "./summary";
const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <App /> },
			{
				path: "/new",
				element: <NewHabitPage />,
			},
			{
				path: "/summary/:id",
				element: <SummaryPage />
			}
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ConfettiProvider>
			<QueryClientProvider client={queryClient}>
				<MantineProvider
					withGlobalStyles={true}
					withNormalizeCSS={true}
					theme={{
						colorScheme: "dark",
						fontFamily: "poppins",
					}}
				>
					<NotificationsProvider>
						<RouterProvider router={router} />
					</NotificationsProvider>
				</MantineProvider>
			</QueryClientProvider>
		</ConfettiProvider>
	</React.StrictMode>,
);
