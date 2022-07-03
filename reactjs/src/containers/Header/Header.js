import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";

import { FormattedMessage } from "react-intl";
import { LANGUAGE, USER_ROLE } from "../../utils";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  changeLauguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="lang-log">
          <div className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.lastName ? userInfo.lastName : ""} !
          </div>
          <div className="language text-center">
            <div className={language === LANGUAGE.VI ? "language-vi active" : "language-vi"}>
              <span onClick={() => this.changeLauguage(LANGUAGE.VI)}>VI</span>
            </div>
            <div className={language === LANGUAGE.EN ? "language-en active" : "language-vi"}>
              <span onClick={() => this.changeLauguage(LANGUAGE.EN)}>EN</span>
            </div>
          </div>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout} title="Logout">
            <i className="fas fa-sign-out-alt"></i>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
