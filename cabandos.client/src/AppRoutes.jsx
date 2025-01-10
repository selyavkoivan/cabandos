import Board  from "./components/kanban/Board";
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"


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
    }
];

export default AppRoutes;