import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className=".secsion about">
        <div className="about-header">Truyền thông</div>
        <div className="about-content">
          <div className="about-left">
            <iframe
              width="942"
              height="530"
              src="https://www.youtube.com/embed/21tjOW8BvB4?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="about-right"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
