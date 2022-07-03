import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils";
import { withRouter } from "react-router";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }
  DetailDoctor = (doctor) => {
    this.props.history.push(`/detai-doctor/${doctor.id}`);
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <div className="secsion Doctor">
        <div className="secsion-container">
          <div className="secsion-header">
            <span>Chuyên khoa phổ biến</span>
            <button className="btn-secsion">Xem thêm</button>
          </div>
          <div className="secsion-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imgBase64 = "";
                  if (item.image) {
                    imgBase64 = new Buffer(item.image, "base64").toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName} `;
                  let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName} `;
                  return (
                    <div
                      className="secsion-customize"
                      key={index}
                      onClick={() => this.DetailDoctor(item)}
                    >
                      <div className="customize">
                        <div className="out-bg">
                          <div
                            className="bg-img imgDoctor"
                            style={{ backgroundImage: `url(${imgBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                          <div>Cơ sương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
