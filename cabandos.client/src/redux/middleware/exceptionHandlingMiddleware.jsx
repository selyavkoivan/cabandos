import { toast, Bounce } from 'react-toastify';
import NotificationManager from '../../components/shared/notifications/NotificationManager'


const exceptionHandlingMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        console.error('Rejected action caught in middleware:', action);
    }
    return next(action);
};

export default exceptionHandlingMiddleware;