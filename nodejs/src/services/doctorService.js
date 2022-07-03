import db from "../models/index";

let getTopDoctor = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveInfoDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMaskdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let user = await db.Maskdowns.findOne({
          where: { doctorId: data.doctorId },
        });
        if (!user) {
          await db.Maskdowns.create({
            contentHTML: data.contentHTML,
            contentMaskdown: data.contentMaskdown,
            descripttion: data.descripttion,
            doctorId: data.doctorId,
          });
        } else {
          (user.contentHTML = data.contentHTML),
            (user.contentMaskdown = data.contentMaskdown),
            (user.descripttion = data.descripttion),
            user.save();
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Save info doctor succeed ",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoDoctor = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter! ",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
            roleID: "R2",
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Maskdowns,
              attributes: ["descripttion", "contentHTML", "contentMaskdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  saveInfoDoctor: saveInfoDoctor,
  getInfoDoctor: getInfoDoctor,
};
