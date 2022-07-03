import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="secsion Specialty">
        <div className="secsion-container">
          <div className="secsion-header">
            <span>Chuyên khoa phổ biến</span>
            <button className="btn-secsion">Xem thêm</button>
          </div>
          <div className="secsion-body">
            <Slider {...this.props.settings}>
              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 1</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 2</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 3</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 4</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 5</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 6</div>
              </div>

              <div className="secsion-customize">
                <div className="bg-img imgSpecialty" />
                <div>Cơ xương khớp 7</div>
              </div>
            </Slider>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
