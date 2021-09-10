import { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MoviesPage from "./pages/movies";

const App: FunctionComponent = () => {
  return (
    <>
      <Switch>
        {/* <ProtectedRoute path="/movies/:id" component={MovieForm} /> */}
        <Route component={MoviesPage} exact={true} path="/movies" />
        <Redirect from="/" exact to="/movies" />
      </Switch>
    </>
  );
};

export default App;
