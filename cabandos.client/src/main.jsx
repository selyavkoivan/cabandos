import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>,
)
