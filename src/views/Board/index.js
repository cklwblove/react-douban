import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabbar from '../../components/Tabbar';
import Swiper from 'swiper/dist/js/swiper.min';
import 'swiper/dist/css/swiper.css';
import arrowIcon from './arrowright.png';
import './board.css';
import services from '../../services';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [
        {key: 'inTheaters,in_theaters'},
        {key: 'comingSoon,coming_soon'},
        {key: 'usBox,us_box'},
        {key: 'top250,top250'}
      ]
    }
  }

  componentDidMount() {
   this.loadBoards()
  }

  loadBoards() {
    const data = {
      start: 1,
      count: 8
    };

    const tasks = this.state.boards.map((board) => {
      return services[board.key.split(',')[0]]({data}).then((d) => {
        let list = [];
        board.title = d.title;
        if (d.subjects.length) {
          list = d.subjects.map((v) => {
            // 北美电影排行的API中数据格式与普通的API不同，这里是渲染北美电影排行的数据
            if (v.subject) {
              return v.subject;
            } else {
              return v;
            }
          });
        }
        board.movies = list;
        return board;
      });
    });

    Promise.all(tasks).then((boards) => {
      this.setState({
        boards
      });
      new Swiper('.slide', {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination'
        }
      });
    });
  }

  render() {
    const {boards} = this.state;
    const slideImages = Array.isArray(boards[0].movies) && boards[0].movies.map((v, index) => {
      return (
        <div className="swiper-slide" key={index}>
          <img src={v.images.large} alt={v.images.large}/>
        </div>
      )
    });

    return (
      <div className="container page-board">
        {/*轮滑*/}
        <div className="slide">
          <div className="swiper-wrapper">
            {slideImages}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="board">
          {
            Array.isArray(boards) && boards.map((item, index) => {
              return (
                <div className="board-item" key={index}>
                  <Link to={`/list?type=${item.key.split(',')[0]}&title=${item.title}`}>
                    <div className="title">
                      <span>{item.title}</span>
                      <img className="icon-arrow" src={arrowIcon} alt="箭头"/>
                    </div>
                  </Link>
                  <div className="content">
                    <div className="inner">
                      {
                        Array.isArray(item.movies) && item.movies.map((movie) => {
                          return (
                            <Link to={`/item?id=${movie.id}`} key={movie.id}>
                              <div className="movie-item">
                                <img className="movie-poster" src={movie.images.large} alt={movie.images.large}/>
                                <span>{movie.title}</span>
                              </div>
                            </Link>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <Tabbar />
      </div>
    );
  }
}

export default Board;
