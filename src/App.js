import React, { Component } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from './components/common/auth';
import Customers from './components/customers';
import Login from './components/login';
import MovieForm from './components/movieForm';
import Movies from './components/movies';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Register from './components/register';
import Rentals from './components/rentals';
import './App.css';

class App extends Component {
  navLinks = [
    { path: '/movies', label: 'Movies' },
    { path: '/customers', label: 'Customers' },
    { path: '/rentals', label: 'Rentals' },
  ];

  render() {
    return (
      <AuthProvider>
        <Router>
          <header>
            <Navbar links={this.navLinks} />
          </header>
          <main className="container">
            <Switch>
              <Route path="/movies/:id" component={MovieForm} />
              <Route path="/movies" component={Movies} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />

              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <Redirect from="/" exact to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
