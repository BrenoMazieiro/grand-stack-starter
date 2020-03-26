import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";

let movieTitle = "a";
const styleCard = {
  width: "18rem"
};
const GET_MOVIES = gql`
{
  MoviesByTitle(substring: "${movieTitle}")
  {
    id
    title
    year
    plot
    poster
    imdbRating
    created {
      formatted
    }
    updated {
      formatted
    }
  }
}
`;

const Movies = () => {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) return "Loading";
  if (error) return `Error! ${error.message}`;

  if (data.MoviesByTitle.length > 0) {
    return (
      <div class="card-columns">
        {data.MoviesByTitle.map(movie => (
          <div class="card" style={styleCard} key={movie.id}>
            <img src={movie.poster} class="card-img-top" alt="..."></img>
            <div class="card-body">
              <h5 class="card-title">
                {movie.title} ({movie.year}) - {movie.imdbRating}{" "}
              </h5>
              <p class="card-text">{movie.plot}</p>
              <a href="/" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <ul>There is no Movie Yet, maybe if you create some it will be here!</ul>
    );
  }
};

export default Movies;
