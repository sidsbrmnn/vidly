import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/common/Auth';
import ProtectedRoute from './components/common/ProtectedRoute';
import Customers from './components/Customers';
import Login from './components/Login';
import Logout from './components/Logout';
import MovieForm from './components/MovieForm';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Register from './components/Register';
import Rentals from './components/Rentals';

const App = () => {
  const navLinks = [
    { path: '/movies', label: 'Movies' },
    { path: '/customers', label: 'Customers' },
    { path: '/rentals', label: 'Rentals' },
  ];

  return (
    <AuthProvider>
      <Router>
        <header>
          <Navbar links={navLinks} />
        </header>
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />

            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />

            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
