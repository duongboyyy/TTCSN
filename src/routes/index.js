import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Profile from "../pages/Customer/Profile";
import Ticket from "../pages/Customer/Ticket";
import ManagerAccount from "../pages/Admin/ManagerAccount";
import ManagerTicket from "../pages/Admin/ManagerTicket";
import ManagerProfile from "../pages/Staff/ManagerProfile";
import ExcutiveTicket from "../pages/Staff/ExcutiveTicket";
import InfocustomerDetail from "../pages/Staff/InfoCustomerDetail";
export const routes = [
    {
        path: "/dashboard",
        element: <LayoutDefault />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "ticket",
                element: <Ticket />
            },
            {
                path: "manageraccount",
                element: <ManagerAccount />,
            },
            {
                path: "managerticket",
                element: <ManagerTicket />
            },
            {
                path: "managerprofile",
                element: <ManagerProfile />,
    

            },
            {
                path: "excutive",
                element: <ExcutiveTicket />
            },
            {

                path:"infodetail",
                element: <InfocustomerDetail />

            }


        ]
    },
    {
        path: "/",
        element: <Login />

    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/register",
        element: <Register />
    }
]