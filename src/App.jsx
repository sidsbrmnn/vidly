import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';
import './App.css';
import { AuthProvider, RequireAuth } from './components/common/Auth';
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
    <Router>
      <AuthProvider>
        <header>
          <Navbar links={navLinks} />
        </header>
        <main className="container">
          <Routes>
            <Route
              path="/movies/:id"
              element={
                <RequireAuth>
                  <MovieForm />
                </RequireAuth>
              }
            />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/customers"
              element={
                <RequireAuth>
                  <Customers />
                </RequireAuth>
              }
            />
            <Route
              path="/rentals"
              element={
                <RequireAuth>
                  <Rentals />
                </RequireAuth>
              }
            />
            <Route path="/not-found" element={<NotFound />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" exact element={<Navigate to="/movies" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
