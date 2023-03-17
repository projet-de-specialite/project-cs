import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import SignupCard from "./views/SignupCard"
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignupCard/>
    },
]);

export const App = () => (
    <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
    </ChakraProvider>
)
