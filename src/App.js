import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/rentals";
import MoviesPage from "./pages/movies";

/**
 *
 * @type {import("react").FunctionComponent}
 */
const App = () => {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/customers" component={Customers} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/movies/:id" component={MovieForm} />
        <Route component={MoviesPage} exact={true} path="/movies" />
        <Route path="/register" component={RegisterForm} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default App;
