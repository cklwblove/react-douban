/**
 *
 * @authors liwb (you@example.org)
 * @date    2018/8/9 15:01
 * @version $ IIFE
 */

/* name module */

import React, {Component} from 'react';
import MovieList from '../../components/MovieList';
import Tabbar from '../../components/Tabbar';
import './search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      subtitle: '请在此输入搜索内容'
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    const {search, subtitle} = this.state;
    return (
      <div className="container page-search">
        <div className="header">
          <input type="text" placeholder={subtitle} className="search" onChange={this.handleSearch}/>
        </div>
        <MovieList type="search" searchVal={search}/>
        <Tabbar />
      </div>
    )
  }
}
