import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import SignupCard from "./views/SignupCard"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Base from "./views/Base";
import Home from "./views/Home";

const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignupCard />
    },
    {
        path: "/",
        element: <Home />
    }

]);

export const App = () => (
    <ChakraProvider theme={theme}>
        <Base>
            <RouterProvider router={router}/>
        </Base>
    </ChakraProvider>
)
