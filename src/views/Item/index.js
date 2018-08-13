import React, {Component} from 'react';
import services from '../../services';
import './item.css';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      movie: {}
    };
  }

  componentDidMount() {
    this.loadSubject();
  }

  async loadSubject() {
    const {search} = this.props.location;
    const id = search.substring(4);
    console.log(this.props);
    const data = {
      id
    };
    console.log('loadSubject', id);
    try {
      const res = await services.subject({method: 'get', data});
      console.log('loadSubject', res);
      this.setState({
        title: res.title,
        movie: res
      });
    } catch (err) {
      console.log('Item componentDidMount ', err);
      this.setState({
        title: '',
        movie: {}
      });
    }
  }

  render() {
    const {movie} = this.state;
    console.log('render');
    const Background = () => {
      //TODO
      if (!movie || !movie.images || !movie.images.large) return '';
      return (
        <div>
          <div className="background" style={{backgroundImage: `url(${movie.images.large})`}}></div>
          <div className="meta">
            <div className="poster"><img src={movie.images.large} alt={movie.images.large}/></div>
            <p className="title">{movie.title}{movie.year}</p>
            <p className="info">评分：{movie.rating.average}</p>
            <p className="info">导演：
              {movie.directors.map((item) => item.name)}&nbsp;
            </p>
            <p className="info">主演：{movie.casts.map((item) => item.name + ' ')}</p>
          </div>
          <div className="summary">
            <p className="label">摘要：</p>
            <p className="content">{movie.summary}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="container page-item">
        <Background movie={movie}/>
      </div>
    );
  }
}

export default Item;

// 生命周期函数执行顺序
// 及防御编程处理

