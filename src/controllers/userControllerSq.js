const DB = require("../database/models");
const { validationResult } = require("express-validator");
const multerMidd = require("../middlewares/multerMiddleware");
const path = require("path");
const bcryptjs = require("bcryptjs");
const uploadUserImagePath = "/assets/images/avatars/";
const sequelize = DB.sequelize;
const { Op } = require("sequelize");
const User = require("../database/models/User");
const moment = require("moment");

let usersDB = [];

let dataValidation = {
  name: "",
  email: "",
  password: "",
};

const userController = {
  userRegister: (req, res) => {
    dataValidation.password = "";
    res.render("userRegister.ejs", { dataValidation: dataValidation });
  },

  processRegister: (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a Image File");
      error.httpStatusCode = 400;
      return next(error);
    }

    const allUsers = DB.User.findAll().then((users) => {
      if (users.length > 0) {
        for (user of users) {
          usersDB.push(user);
        }
      }
    });

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("userRegister.ejs"),
      {
        errors: resultValidation.mapped(),
        oldData: req.body,
      };
    }

    let imageName = uploadUserImagePath + req.file.filename;
    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;

    if (password != passwordRepit) {
      dataValidation.password = "Las contraseñas ingresadas no son iguales";
    } else {
    }

    let userInDB = userRepit(email, userName, -1);

    if (userInDB.email || userInDB.name || dataValidation.password) {
      return res.render("userRegister", {
        dataValidation: userInDB,
        oldData: req.body,
      });
    } else {
    }

    let userToSave = {
      user_name: userName,
      email: email,
      password: bcryptjs.hashSync(passwordRepit, 10),
      avatar: imageName,
      is_admin: 0,
    };

    DB.User.create(userToSave)
      .then(function () {
        return res.redirect("/login");
      })
      .catch(function (error) {
        return res.send(error);
      });
  },

  updateUser: async (req, res) => {
    let id = req.params.id;
    let userToEdit = [];
    const userInDB = await DB.User.findByPk(id).then((user) => {
      userToEdit.push(user.dataValues);
    });
    res.render("userUpdate.ejs", { user: userToEdit[0] });
  },

  editUser: async (req, res) => {
    let id = req.params.id;
    const file = req.file;
    let imageName = "";
    let modificarImagen = false;
    if (file) {
      imageName = uploadUserImagePath + req.file.filename;
      modificarImagen = true;
    } else {
      console.log("No hay image");
    }

    let user_name = req.body.userName;
    let email = req.body.userEmail;
    let avatar = "";

    let userInDB = userRepit(email, user_name, id);

    if (userInDB.email || userInDB.name) {
      return res.render("userRegister", {
        dataValidation: userInDB,
        oldData: req.body,
      });
    } else {
    }

    if (!modificarImagen) {
      const userInDB = await DB.User.findByPk(id).then((user) => {
        avatar = user.avatar;
      });
    } else {
      avatar = imageName;
    }

    const actualizada = await DB.User.update(
      {
        user_name,
        email,
        avatar
      },
      {
        where: {
          user_id: id,
        },
      }
    );

    res.redirect("/userDetail/" + id);
  },

  userDetail: async (req, res) => {
    let id = req.params.id;
    let userToShow = [];
    const userInDB = await DB.User.findByPk(id)
      .then((user) => {
        userToShow.push(user.dataValues);
      });
    res.render("userDetail.ejs", { userToShow: userToShow[0] });
  },

  delete: async (req, res) => {
    let user = await DB.User.findByPk(req.params.id);
    await user.destroy();

    res.redirect("/usersList");
  },

  usersList: async (req, res) => {
    let usersList = await DB.User.findAll();
    res.render("usersList.ejs", { users: usersList });
  },

  login: (req, res) => {
    res.render("login.ejs");
  },

  loginProcess: (req, res) => {
    let userToLogin = findByField("userEmail", req.body.email);
    console.log(userToLogin);
  },
};

//******************************** FUNCIONES AUXILIARES ******************************* */

function findAll() {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

function findIndex(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return i;
    }
  }
}

function generateID() {
  let id = 0;
  if (allUsers.length != 0) {
    id = allUsers[allUsers.length - 1].id + 1;
  } else {
    id = 1;
  }
  return id;
}

function findByPk(id) {
  let userFound = allUsers.find((oneUser) => oneUser.id === id);
  return userFound;
}

function findByField(field, text) {
  let userFound = allUsers.find((oneUser) => oneUser[field] === text);
  return userFound;
}

function userRepit(email, name, id) {
  dataValidation.name = "";
  dataValidation.email = "";

  for (let i = 0; i < usersDB.length; i++) {
    if (id < 0) {
      if (usersDB[i].user_name == name) {
        dataValidation.name =
          "Este nombre de usuario ya se encuentra registrado";
      }
      if (usersDB[i].email == email) {
        dataValidation.email = "Este email ya se encuentra registrado";
      }
    } else {
      if (usersDB.id != id) {
        if (usersDB[i].user_name == name) {
          dataValidation.name =
            "Este nombre de usuario ya se encuentra registrado";
        }
        if (usersDB[i].email == email) {
          dataValidation.email = "Este email ya se encuentra registrado";
        }
      } else {
      }
    }
  }

  return dataValidation;
}

module.exports = userController;
