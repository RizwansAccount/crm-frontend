import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import SignupPage from "../pages/signupPage/SignupPage";
import ProtectedRoutes from "./ProtectedRoutes";

const ReactRoute = createBrowserRouter([
    {
        path: `${ROUTES.login}`,
        element: <LoginPage />
    },
    // {
    //     path: `${ROUTES.signup}`,
    //     element: <SignupPage />
    // },
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