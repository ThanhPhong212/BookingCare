import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGE, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./CrudRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";
class CrudRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],

      preImg: "",
      isOpen: false,
      disabled: 1,
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.userRedux !== this.props.userRedux) {
      let arrGender = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        preImg: "",
      });
    }
  }

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        preImg: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreViewImg = () => {
    if (!this.state.preImg) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;

    //fire redux
    this.props.createNewUsers({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      image: this.state.avatar,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "phoneNumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.info("Missing paraerter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUserFromParent = (user) => {
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      id: user.id,
      email: user.email,
      password: "password",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: user.avatar,
      preImg: imgBase64,
      disabled: 0,
    });
  };

  handleSaveEditUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;
    this.props.updateUser({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      image: this.state.avatar,
    });
    this.setState({
      disabled: 1,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } =
      this.state;
    return (
      <div className="user-redux-container">
        <div className="title">CRUD with Redux</div>
        <div>{isLoadingGender === true ? "Loading gender" : ""}</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="my-3">
              <FormattedMessage id="manage-user.add" />
            </div>
            <div className="row">
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  disabled={this.state.disabled !== 1}
                />
              </div>
              <div className="col-2">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  disabled={this.state.disabled !== 1}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="address"
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-2">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-2">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-2">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "position");
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-2">
                <label>
                  <FormattedMessage id="manage-user.roleID" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="img">
                  <input
                    id="pre-image"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImg(event)}
                  />
                  <label className="upload" htmlFor="pre-image">
                    <FormattedMessage id="manage-user.loadimage" />
                    <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="pre-img"
                    style={{ backgroundImage: `url(${this.state.preImg})` }}
                    onClick={() => this.openPreViewImg()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    this.handleSaveUser();
                  }}
                  hidden={this.state.disabled !== 1}
                >
                  <FormattedMessage id="manage-user.save" />
                </div>
                <div
                  className="btn btn-primary"
                  onClick={() => this.handleSaveEditUser()}
                  hidden={this.state.disabled !== 0}
                >
                  <FormattedMessage id="manage-user.save" />
                </div>
              </div>
              <div className="col-12 mt-4">
                <TableManageUser handleEditUserFromParentKye={this.handleEditUserFromParent} />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.preImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUsers: (data) => dispatch(actions.createNewUsers(data)),
    updateUser: (data) => dispatch(actions.updateUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrudRedux);
