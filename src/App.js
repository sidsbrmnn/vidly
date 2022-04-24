import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/common/auth';
import ProtectedRoute from './components/common/protectedRoute';
import Customers from './components/customers';
import Login from './components/login';
import Logout from './components/logout';
import MovieForm from './components/movieForm';
import Movies from './components/movies';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Register from './components/register';
import Rentals from './components/rentals';

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
