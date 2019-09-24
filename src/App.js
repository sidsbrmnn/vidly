import React, { Component } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import Movies from './components/movies';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Rentals from './components/rentals';

class App extends Component {
  navLinks = [
    { path: '/movies', label: 'Movies' },
    { path: '/customers', label: 'Customers' },
    { path: '/rentals', label: 'Rentals' },
  ];

  render() {
    return (
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
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
