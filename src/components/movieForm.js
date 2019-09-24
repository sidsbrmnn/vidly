import React, { Component } from 'react';

class MovieForm extends Component {
  render() {
    const { match } = this.props;

    return (
      <section className="py-5">
        <h1>Movie Form {match.params.id}</h1>
      </section>
    );
  }
}

export default MovieForm;
