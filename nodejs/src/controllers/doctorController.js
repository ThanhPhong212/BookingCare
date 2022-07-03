import doctorService from "../services/doctorService";

let getTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctor(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllDoctor = async (req, res) => {
  try {
    let doctor = await doctorService.getAllDoctor();
    return res.status(200).json(doctor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let saveInfoDoctor = async (req, res) => {
  try {
    let info = await doctorService.saveInfoDoctor(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getInfoDoctor = async (req, res) => {
  try {
    let info = await doctorService.getInfoDoctor(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  saveInfoDoctor: saveInfoDoctor,
  getInfoDoctor: getInfoDoctor,
};
