import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Base from "./views/Base";
import Home from "./views/Home";
import Profile from "./views/Profile";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import AuthService from "./services/auth";
import { redirect,Routes, Route } from "react-router-dom";

const Logout = ()=>{
    AuthService.logout();
    return redirect("/login");    
};

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routes>
            
            <Route path="/" element={<Base />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
        </Routes>
        
    </ChakraProvider>
)
