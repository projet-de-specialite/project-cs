import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Base from "./views/Base";
import SignUp from "./views/SignUp";
import Login from "./views/Login";

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

]);

export const App = () => (
    <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
    </ChakraProvider>
)
