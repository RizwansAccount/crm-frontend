import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AppLayout from "./AppLayout";
import ContactPage from "../pages/contactPage/ContactPage";
import LeadDetailsPage from "../pages/leadDetailsPage/LeadDetailsPage";

const ReactRoute = createBrowserRouter([
    {
        path: `${ROUTES.login}`,
        element: <LoginPage />
    },
    {
       element : <AppLayout/>,
       children : [
        {
            element: <ProtectedRoutes />,
            children: [
                {
                    path: `${ROUTES.home}`,
                    element: <HomePage />
                },
                {
                    path: `${ROUTES.contact}`,
                    element: <ContactPage />
                },
            ]
        }
       ]
    },
    {
        element : <ProtectedRoutes/>,
        children: [
            {
                path : `${ROUTES.leadDetailsPage}/:id`,
                element : <LeadDetailsPage/>
            }
        ]
    }
]);

export default ReactRoute;