import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Swiper from 'swiper/dist/js/swiper.min';
import 'swiper/dist/css/swiper.css';
import services from '../../services';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderSwiper: null,
      movies: []
    };

    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    this.getComingSoon();
  }

  async getComingSoon() {
    const data = {
      start: 0,
      count: 3
    };
    try {
      const res = await services.comingSoon({data});
      this.setState({
        movies: res.subjects
      });
      this.sliderSwiper = new Swiper('.carousel', {
        loop: false,
        autoplay: false
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  handleStart() {
    this.props.history.push('/board');
  }

  render() {
    const {movies} = this.state;
    const imageSlides =
      movies.map((v, index) => {
        return (
          <div className="swiper-slide" key={index}>
            <img src={v.images.large} alt={v.images.large}/>
            <button style={{ display: index === movies.length - 1 ? 'block' : 'none'}} className="button-experience" onClick={this.handleStart}>立即体验</button>
          </div>
        );
      });

    return (
      <div className="container">
        <div className="carousel">
          <div className="swiper-wrapper">
            {imageSlides}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    );
  }

}

export default withRouter(Home);
