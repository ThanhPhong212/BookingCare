import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Secsion/Specialty";
import MedicalFacility from "./Secsion/MedicalFacility";
import Doctor from "./Secsion/Doctor";
import HandBook from "./Secsion/HandBook";
import About from "./Secsion/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
    };
    return (
      <React.Fragment>
        <HomeHeader showBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <Doctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
