import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displaygetCRUD);

  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handlegetAllUsers);
  router.post("/api/create-user", userController.handleCreateUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor", doctorController.getTopDoctor);
  router.get("/api/all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-info-doctor", doctorController.saveInfoDoctor);
  router.get("/api/get-info-doctor", doctorController.getInfoDoctor);
  return app.use("/", router);
};

module.exports = initWebRoutes;
