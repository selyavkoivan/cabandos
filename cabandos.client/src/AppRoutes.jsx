import Board  from "./components/kanban/Board";
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import Users from "./components/user/Users"
import Profile from "./components/user/Profile"


const AppRoutes = [
    {
        index: true,
        element: <Board />
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
        element: <Users />
    },
    {
        path: '/profile/*',
        element: <Profile />
    },
];

export default AppRoutes;