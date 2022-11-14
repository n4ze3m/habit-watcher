import "./style.css";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { Layout } from "./Layout";
import { NewHabitPage } from "./new-habit";
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
		],
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider
			withGlobalStyles={true}
			withNormalizeCSS={true}
			theme={{
				colorScheme: "dark",
				fontFamily: "poppins",
			}}
		>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
);
