import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMaskdown: "",
      contentHTML: "",
      selectedOption: "",
      descripttion: " ",
      doctorArr: [],
    };
  }

  async componentDidMount() {
    this.props.getAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorRedux !== this.props.doctorRedux) {
      let arrDoctor = this.buildInputSelect(this.props.doctorRedux);
      this.setState({
        doctorArr: arrDoctor,
      });
    }

    if (prevProps.language !== this.props.language) {
      let arrDoctor = this.buildInputSelect(this.props.doctorRedux);
      this.setState({
        doctorArr: arrDoctor,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMaskdown: text,
      contentHTML: html,
    });
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    await this.props.getInfoDoctor(selectedOption.value);
    let doctor = this.props.detaildoctors;
    if (doctor && doctor.Maskdown) {
      this.setState({
        contentHTML: doctor.Maskdown.contentHTML,
        contentMaskdown: doctor.Maskdown.contentMaskdown,
        descripttion: doctor.Maskdown.descripttion,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMaskdown: "",
        descripttion: "",
      });
    }
  };

  handleSaveInfoDoctor = () => {
    this.props.createInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMaskdown: this.state.contentMaskdown,
      descripttion: this.state.descripttion,
      doctorId: this.state.selectedOption.value,
    });
  };

  handleOnChangSelect = (event) => {
    this.setState({
      descripttion: event.target.value,
    });
  };

  buildInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName} `;
        obj.label = language === LANGUAGE.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="info-doctor container">
          <div className="info-doctor-title text-center mt-5">Thông tin bác sĩ</div>
          <div className="mt-3">Chọn Bác sĩ:</div>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.state.doctorArr}
            className="col-3 mt-1"
          />
          <div className="mt-3">Thông tin giới thiệu:</div>
          <textarea
            className="mt-1 mb-4 form-control"
            rows="5"
            onChange={(event) => this.handleOnChangSelect(event)}
            value={this.state.descripttion}
          ></textarea>

          <MdEditor
            style={{ height: "450px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMaskdown}
          />

          <button
            className=" col-1  btn btn-primary mt-4 mb-4"
            onClick={() => this.handleSaveInfoDoctor()}
          >
            Lưu
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorRedux: state.admin.doctors,
    detaildoctors: state.admin.detaildoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
