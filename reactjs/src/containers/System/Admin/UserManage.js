import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUser, editUser, deleteUser } from "../../../services/userService";
import ModalUser from "../ModalUser";
import ModalEditUser from "../ModalEditUser";
import { emitter } from "../../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isModalEditUser: !this.state.isModalEditUser,
    });
  };

  hadleAddNewuser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  createNewUser = async (data) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA"); // cai nafy hocj theem
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isModalEditUser: true,
      userEdit: user,
    });
  };

  updateUser = async (user) => {
    try {
      let res = await editUser(user);
      if (res && res.errCode === 0) {
        this.setState({
          isModalEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUser(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    console.log(arrUsers);
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromRarent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isModalEditUser}
            toggleFromRarent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            updateUser={this.updateUser}
          />
        )}
        <div className="title text-center">Manage User</div>
        <div className="mx-2">
          <button className="btn btn-primary px-3" onClick={() => this.hadleAddNewuser()}>
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="user-table mt-3 mx-2">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                //console.log("check map", item, index);
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
