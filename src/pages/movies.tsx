import { FunctionComponent } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";

const MoviesPage: FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Header>Movies</Header>
    </>
  );
};

export default MoviesPage;
