import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Page_MainLayout } from "@/components/layouts/pages";
import { Home_Page, NotFound_Page } from "@/pages";
import { ThemeProvider } from "@/components/shadcn";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Page_MainLayout />,
      children: [
        { index: true, element: <Home_Page /> },
        { path: "*", element: <NotFound_Page /> },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}
