import React, {Component} from 'react';
import MovieList from '../../components/MovieList';

class List extends Component {
  render() {
    return (
      <div className="container">
        <MovieList type="more-list"/>
      </div>
    );
  }
}

export default List;
