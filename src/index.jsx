import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Resume from './components/Resume.jsx';
import Connect from './components/Connect.jsx';
import './tailwind.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: "resume",
				element: <Resume />
			},
			{
				path: "connect",
				element: <Connect />
			},
		]
	},
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
