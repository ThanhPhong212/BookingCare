import React, { Component } from "react";
import { connect } from "react-redux";
import "./Schedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGE } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      doctorArr: [],
      currentDate: new Date(),
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.getAllDoctor();
    this.props.getTimeSchedule();
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
    if (prevProps.timeSchedule !== this.props.timeSchedule) {
      this.setState({
        rangeTime: this.props.timeSchedule,
      });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
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

  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
    let time = this.state.rangeTime;
    return (
      <div className=" schedule_container container">
        <div className="schedule_title text-center">Quản lý lich Khám bệnh</div>
        <div className="row mt-5">
          <div className="col-3">
            Chọn bác sĩ:
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.doctorArr}
              className="mt-3"
            />
          </div>
          <div className="col-3">
            Chọn ngày:
            <DatePicker
              onChange={this.handleChangeDatePicker}
              className="form-control mt-3"
              value={this.state.currentDate}
              minDate={new Date()}
            />
          </div>
          <div className="col-12 pick-hour-container">
            {time &&
              time.length > 0 &&
              time.map((item, index) => {
                return (
                  <button className=" btn btn-info" key={index}>
                    {item.valueVi}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorRedux: state.admin.doctors,
    timeSchedule: state.admin.timeSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getTimeSchedule: () => dispatch(actions.getTimeSchedule()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
