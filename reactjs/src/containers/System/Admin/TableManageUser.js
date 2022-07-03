import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  async componentDidMount() {
    this.props.getAllUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userRedux !== this.props.userRedux) {
      let arrUser = this.props.userRedux;
      this.setState({
        userArr: arrUser,
      });
    }
  }

  handleDeleteUser = async (user) => {
    this.props.deleteUser(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKye(user);
  };
  render() {
    let getAllUser = this.state.userArr;
    return (
      <React.Fragment>
        <table id="customers" className="mt-4 mb-4">
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

          {getAllUser &&
            getAllUser.map((item, index) => {
              return (
                <tr key={index} onClick={() => this.handleEditUser(item)}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.gender}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.positionId}</td>
                  <td>{item.roleId}</td>
                  <td>
                    <button className="btn-Edit" onClick={() => this.handleEditUser(item)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-Delete" onClick={() => this.handleDeleteUser(item)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.getAllUser()),
    deleteUser: (user) => dispatch(actions.deletUsers(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
