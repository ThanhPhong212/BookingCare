import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomeHeader";
import { LANGUAGE } from "../../../utils";
import "./DetaiDoctor.scss";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: "",
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.props.getInfoDoctor(id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detaildoctors !== this.props.detaildoctors) {
      let infoDoctor = this.props.detaildoctors;
      this.setState({
        detailDoctor: infoDoctor,
      });
    }
  }
  render() {
    let language = this.props.language;
    let infodoctor = this.state.detailDoctor;
    let nameVi = "",
      nameEn = "";
    if (infodoctor && infodoctor.positionData) {
      nameVi = `${infodoctor.positionData.valueVi}, ${infodoctor.firstName} ${infodoctor.lastName} `;
      nameEn = `${infodoctor.positionData.valueEn}, ${infodoctor.lastName} ${infodoctor.firstName} `;
    }

    return (
      <>
        <HomeHeader showBanner={false} />
        <div className="doctor-detail-container container-fluid">
          <div className="doctor-detail-content container">
            <div className="intro">
              <div className="avt">
                <div
                  className="img-doctor"
                  style={{ backgroundImage: `url(${infodoctor.image})` }}
                ></div>
              </div>
              <div className="info">
                <div className="name pt-2">{language === LANGUAGE.VI ? nameVi : nameEn}</div>
                <div className="description pt-2">
                  {infodoctor.Maskdown && infodoctor.Maskdown.descripttion && (
                    <span>{infodoctor.Maskdown.descripttion}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="schedule"></div>
            <div className="detail">
              {infodoctor && infodoctor.Maskdown && infodoctor.Maskdown.contentHTML && (
                <div dangerouslySetInnerHTML={{ __html: infodoctor.Maskdown.contentHTML }}></div>
              )}
            </div>
            <div className="coment"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detaildoctors: state.admin.detaildoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
