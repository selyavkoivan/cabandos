import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <ToastContainer />
    </BrowserRouter>,
)
