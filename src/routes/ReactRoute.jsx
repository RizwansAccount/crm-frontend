import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";

const ReactRoute = createBrowserRouter([
    {
        path: `${ROUTES.login}`,
        element: <LoginPage />
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: `${ROUTES.home}`,
                element: <HomePage />
            }
        ]
    }
]);

export default ReactRoute;