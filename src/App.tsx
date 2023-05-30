import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"

import Base from "./views/Base";
import Home from "./views/Home";
import Profile from "./views/Profile";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import AuthService from "./services/auth";
import { redirect,Routes, Route } from "react-router-dom";
import CreatePost from "./views/CreatePost";
import auth from "./services/auth";

const Logout = ()=>{
    AuthService.logout();
    return redirect("/login");
};

export const App = () => {

    const currentUser : any = auth.getCurrentUser();

    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" index element={<Home user={currentUser} />} />
                <Route path="/profile" element={<Profile user={currentUser} />} />
                <Route path="/createPost" element={<CreatePost user={currentUser} />} />
                <Route path="/signUp" element={<SignUp user={currentUser} />} />
                <Route path="/login" element={<Login user={currentUser} />} />

            </Routes>

        </ChakraProvider>
    )
};