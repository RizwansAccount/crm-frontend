import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./RouteConstants";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AppLayout from "./AppLayout";
import ContactPage from "../pages/contactPage/ContactPage";
import LeadDetailsPage from "../pages/leadDetailsPage/LeadDetailsPage";
import ContactDetailsPage from "../pages/contactDetailsPage/ContactDetailsPage";
import LeadPage from "../pages/leadPage/LeadPage";
import OpportunityPage from "../pages/opportunityPage/OpportunityPage";
import PipelinePage from "../pages/pipelinePage/PipelinePage";

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
                {
                    path: `${ROUTES.lead}`,
                    element: <LeadPage />
                },
                {
                    path: `${ROUTES.opportunity}`,
                    element: <OpportunityPage />
                },
                {
                    path: `${ROUTES.pipeline}`,
                    element: <PipelinePage />
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
            },
            {
                path : `${ROUTES.contactDetailsPage}/:id`,
                element : <ContactDetailsPage/>
            },
        ]
    }
]);

export default ReactRoute;