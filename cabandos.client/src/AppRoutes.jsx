import Board  from "./kanban/board/Board";
import SignIn  from "./kanban/auth/SignIn"
import SignUp  from "./kanban/auth/SignUp"


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