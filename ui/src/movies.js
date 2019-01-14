import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';

let movieTitle = 'R'

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

const Users = () => {
  const { data, error } = useQuery(GET_MOVIES);
  if (error) return `Error! ${error.message}`;
  
  if(data.MoviesByTitle.length > 0) {
    return (
      <div>
        <ul>
          {
            data.MoviesByTitle.map(movie => (
              <div key={movie.id}>
                <li>Id: {movie.id} </li>
                <li>Title: {movie.title} </li>
                <li>Year: {movie.year} </li>
                <li>Plot: {movie.plot} </li>
                <li>Poster: <img src={movie.poster} alt=""></img> </li>
                <li>ImdbRating: {movie.imdbRating} </li>
              </div>
            ))
          }
        </ul>
      </div>
    );
  } else {
    return (
      <ul>
        there is no movie yet!
      </ul>
  );
  }
};

export default Users;