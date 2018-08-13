import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './movie-info.css';

export default class MovieInfo extends Component {
  render() {
    const {movies} = this.props;
    return (
      <div className="movie-info">
        {
          movies.map((item, index) => {
            return (
              <Link to={`item?id=${item.id}`} key={index}>
                <div className="item">
                  <img src={item.images.small} alt={item.title} className="poster"/>
                  <div className="meta">
                    <p className="title">{item.title}</p>
                    <p className="sub-title">{item.original_title} ({item.year})</p>
                    <p className="artists">导演：
                      {item.directors.map((v) => v.name + ' ')}
                    </p>
                  </div>
                  <p className="rating"><span>{item.rating.average}</span></p>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}
