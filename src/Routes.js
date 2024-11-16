import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Sell from "./pages/Sell";
import MyProducts from "./pages/MyProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./PrivateRoute";
import Checkout from "./pages/Checkout";
import PendingApprovals from "./pages/PendingApprovals";
import MakeAdmin from "./pages/MakeAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element:(<Layout/>),
        //layout will always be rendered
        // any path that starts with "/"
        children: [ // this is the dynamic content {outlet}
            {
                path: "/",
                element: <PrivateRoutes><Home/></PrivateRoutes>
            },
            {
                path: "/about",
                element: <PrivateRoutes><About/></PrivateRoutes>
            },
            {
                path: "/contact",
                element: <PrivateRoutes><Contact/></PrivateRoutes>
            },
            {
                path: "/shop",
                element: <PrivateRoutes><Shop/></PrivateRoutes>
            },
            {
                path: "/sell",
                element: <PrivateRoutes><Sell/></PrivateRoutes>
            },
            {
                path: "/myproducts",
                element: <PrivateRoutes><MyProducts/></PrivateRoutes>
            },
            {
                path: "/checkout",
                element: <PrivateRoutes><Checkout/></PrivateRoutes>
            },
            {
                path: "/pendingapprovals",
                element: <PrivateRoutes><PendingApprovals/></PrivateRoutes>
            },
            {
                path: "/makeadmin",
                element: <PrivateRoutes><MakeAdmin/></PrivateRoutes>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
])

export default router;