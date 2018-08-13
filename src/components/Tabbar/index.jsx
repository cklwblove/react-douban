import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './tabbar.css';

class Tabbar extends Component {
  render() {
    return (
      <div className="tab">
        <div className="tab-item">
          <NavLink to="/board" className="nav-link">
            <i className="icon icon-home"></i>
            <span>榜单</span>
          </NavLink>
        </div>
        <div className="tab-item">
          <NavLink to="/search" className="nav-link">
            <i className="icon icon-search"></i>
            <span>搜索</span>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Tabbar;
