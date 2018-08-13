import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getLocationHrefParam} from 'cloud-utils';
import debounce from 'lodash.debounce';
import InfiniteScroll from 'react-infinite-scroller';
import services from '../../services';
import MovieInfo from '../MovieInfo';
import loading from './loading.gif';
import './movie-list.css';

const propTypes = {
  searchVal: PropTypes.string
};

function NoData (props) {
  return props.hasMore ? '' : <div className="no-data">暂无更多数据</div>
};

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      size: 20,
      movies: [],
      hasMore: true
    };

    this.loadList = this.loadList.bind(this);
  }

  componentWillReceiveProps (nextProps, prevState) {
    console.log('componentWillReceiveProps', nextProps, prevState);
    const {searchVal} = nextProps;
    this.setState({
      page: 1,
      size: 20,
      movies: [],
      hasMore: true
    });

    this.debounceLoadList(searchVal);
  }

  debounceLoadList = debounce((searchVal) => {
    this.loadList(searchVal, true);
  }, 500)

  loadList(val, hasMore = false) {
    console.log('loadList', val);
    const {page, size, movies} = this.state;
    let type = getLocationHrefParam('type');
    const data = {
      start: page,
      count: size
    };

    if (this.props.type === 'search') {
      type = 'search';
      data['q'] = val;

      if (val === '' || hasMore === false) {
        this.setState({
          hasMore: false,
          page: 1,
          size: 20,
          movies: []
        });
        return;
      };
    }

    services[type]({data}).then((res) => {
      let list = [];
      if (res.subjects.length) {
        list = res.subjects.map((v) => {
          // 北美电影排行的API中数据格式与普通的API不同，这里是渲染北美电影排行的数据
          if (v.subject) {
            return v.subject;
          } else {
            return v;
          }
        });
        this.setState({
          page: size + page,
          movies: movies.concat(list),
          hasMore: true
        });
        if (type === 'us_box') {
          this.setState({
            hasMore: false
          });
        }
      } else {
        this.setState({
          hasMore: false
        });
      }
    });
  }

  render() {
    const {movies, hasMore} = this.state;
    const loader =
      <div className="loader" key={0}>
        <img src={loading} alt="加载图片"/>
        <span>玩了命的加载中...</span>
      </div>;
    return (
      <div className="component-movie-list">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadList}
          hasMore={hasMore}
          loader={loader}
          useWindow={false}
        >
          {
            movies.length ? <MovieInfo movies={movies}/> : <NoData hasMore={hasMore}/>
          }
        </InfiniteScroll>
      </div>
    );
  }
}

MovieList.propTypes = propTypes;

export default MovieList;
