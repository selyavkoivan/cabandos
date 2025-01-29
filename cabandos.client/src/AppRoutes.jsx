import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Board from "./components/kanban/Board";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Users from "./components/user/Users";
import Profile from "./components/user/Profile";

import ErrorPage from "./components/shared/ErrorRoute/ErrorPage";
import ProtectedPage from "./components/shared/ErrorRoute/ProtectedPage";

const PrivateRoute = ({ element }) => {
    const isLogin = useSelector((state) => state.auth.isLogin || (sessionStorage.getItem('isLogin') && JSON.parse(sessionStorage.getItem('isLogin'))));

    return isLogin ? element : <Navigate to="/signin" />;
};

const AppRoutes = [
    {
        index: true,
        element: <PrivateRoute element={<Board />} />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/auth/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/users',
        element: <PrivateRoute element={<Users />} />
    },
    {
        path: '/profile/*',
        element: <PrivateRoute element={<Profile />} />
    },
    {
        path: '/protected',
        element: <ProtectedPage />
    },
    {
        path: '*',
        element: <ErrorPage />
    },
];

export default AppRoutes;
