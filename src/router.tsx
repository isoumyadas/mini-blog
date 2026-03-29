/* eslint-disable react-refresh/only-export-components */

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import PageLoader from "./components/PageLoader";

const Bdashboard = lazy(() => import("./pages/App"));
const BAddNew = lazy(() => import("./pages/AddNewBlogPage"))


const router = createBrowserRouter([
    {
        // Root layout wraps everything (Navbar, Footer)
        element : <RootLayout />,
        errorElement : <ErrorPage />, // ← per-route error boundary

        children: [
            {path: "/", element: <Suspense fallback={<PageLoader />}><Bdashboard /></Suspense>},
            {path: "/new", element: <Suspense fallback={<PageLoader />}><BAddNew /></Suspense>},

        ]
    },

    {path: "*", element : <ErrorPage />}
])

export default router;