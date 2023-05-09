import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Base from "./views/Base";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import AuthService from "./services/auth";
import { redirect } from "react-router-dom";
  
const Logout = ()=>{
    AuthService.logout();
    return redirect("/login");    
};
const router = createBrowserRouter([

    {
        path: "/",
        element: <Base />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/logout",
        loader: Logout,
        element: <Login />,
    },

]);

export const App = () => (
    <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
    </ChakraProvider>
)
