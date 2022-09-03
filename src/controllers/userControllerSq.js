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
const { appendFile } = require("fs");

let usersDB = [];

let dataValidation = {
  userName: {msg: ""},
  userEmail: {msg: ""}
};

let isFromGet = false;

const userController = {
  userRegister: (req, res) => {
    isFromGet = true;
    res.render("userRegister.ejs", {
      isFromGet: isFromGet,
    });
  },

  processRegister: async (req, res, next) => {
    //VALIDACIÓN DE DATOS QUE VIENEN DESDE EL FORMULARIO CON "validateRegisterMiddleware.js"
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      isFromGet = false;
      res.render("userRegister.ejs", {
        isFromGet: isFromGet,
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      const file = req.file;
      let imageName = uploadUserImagePath;
      let userName = req.body.userName;
      let email = req.body.userEmail;
      let password = req.body.userPassword;
      let passwordRepit = req.body.userRepitPassword;

      if (!file) {
        imageName = imageName + "defaultUser.jpg";
      } else {
        imageName = imageName + req.file.filename;
      }
      //FIN DE VALIDACIONES CON "validateRegisterMiddleware.js"

      //BUSCA TODOS LOS USUARIOS EN LA BASE DE DATOS
      const allUsers = await DB.User.findAll().then((users) => {
        if (users.length > 0) {
          for (user of users) {
            usersDB.push(user);
          }
        }
      }); //FIN DE BUSQUEDA DE USUARIOS EN DB

      //CHEQUEA SI EL EMAIL Y EL USERNAME YA SE ENCUENTRAN REGISTRADOS
      let userInDB = userRepit(email, userName, -1);

      //SI EL USUARIO YA SE ENCUENTRA REGISTRADO, LO INFORMAMOS A LA VISTA
      if (userInDB.userEmail.msg || userInDB.userName.msg) {
        isFromGet = false;
        return res.render("userRegister", {
          isFromGet: isFromGet,
          errors: userInDB,
          oldData: req.body,
        });
      } else {
      }

      //SE CREA EL USUARIO QUE SE VA A ALMACENAR EN LA DB
      let userToSave = {
        user_name: userName,
        email: email,
        password: bcryptjs.hashSync(passwordRepit, 10),
        avatar: imageName,
        is_admin: 0,
      };

      //SE GUARDA EL USUARIO EN LA DB
      DB.User.create(userToSave)
        .then(function () {
          return res.redirect("/login");
        })
        .catch(function (error) {
          return res.send(error);
        });
    }
  },

  updateUser: async (req, res) => {
    let id = req.params.id;
    let userToEdit = [];
    isFromGet = true;
    const userInDB = await DB.User.findByPk(id).then((user) => {
      userToEdit.push(user.dataValues);
    });
    res.render("userUpdate.ejs", {
      user: userToEdit[0],
      isFromGet: isFromGet,
    });
  },

  editUser: async (req, res) => {
    //VALIDACIÓN DE DATOS QUE VIENEN DESDE EL FORMULARIO CON "validateRegisterMiddleware.js"
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      let avatarInDB = "";
      const file = req.file;
      if (!file) {
        const userInDB = await DB.User.findByPk(req.params.id).then((user) => {
          avatarInDB = user.avatar;
        });
      }

      const user = {
        user_id: req.params.id,
        email: req.body.userEmail,
        avatar: avatarInDB 
      }

      isFromGet = false;
      res.render("userUpdate.ejs", {
        isFromGet: isFromGet,
        errors: resultValidation.mapped(),
        oldData: req.body,
        user: user
      });
    } else {
      let id = req.params.id;
      const file = req.file;
      let avatar = uploadUserImagePath;
      let user_name = req.body.userName;

      if (!file) {
        const userInDB = await DB.User.findByPk(id).then((user) => {
          avatar = user.avatar;
        });
      } else {
        avatar = avatar + req.file.filename;
      }
      //FIN DE VALIDACIONES CON "validateRegisterMiddleware.js"

      //BUSCA TODOS LOS USUARIOS EN LA BASE DE DATOS
      const allUsers = await DB.User.findAll().then((users) => {
        if (users.length > 0) {
          for (user of users) {
            usersDB.push(user);
          }
        }
      }); //FIN DE BUSQUEDA DE USUARIOS EN DB

      //CHEQUEA SI EL USERNAME YA SE ENCUENTRAN REGISTRADOS
      let userInDB = userRepit("", user_name, -1);

      //SI EL USUARIO YA SE ENCUENTRA REGISTRADO, LO INFORMAMOS A LA VISTA
      if (userInDB.name) {
        isFromGet = false;
        return res.render("userUpdate.ejs", {
          errors: userInDB,
          oldData: req.body,
        });
      } else {
      }

      const actualizada = await DB.User.update(
        {
          user_name,
          avatar
        },
        {
          where: {
            user_id: id,
          },
        }
      );
      res.redirect("/userDetail/" + id);
    }
  },

  userDetail: async (req, res) => {
    let id = req.params.id;
    let userToShow = [];
    const userInDB = await DB.User.findByPk(id).then((user) => {
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
    isFromGet = true
    res.render("login.ejs", {
      isFromGet: isFromGet
    });
  },

  loginProcess: async (req, res) => {
    isFromGet = false;
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("login.ejs", {
        isFromGet: isFromGet,
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      const userLogged = await DB.User.findOne({where:{email:req.userEmail}});
      delete userLogged.password; 
      req.session.userLogged = userLogged; //almaceno el usuario loggeado sin el password en SESSION
      res.redirect("userDetail.ejs", {userToShow: userLogged}); 
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('home');
  }
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
/**
 *
 * @param {*} email Email que viene desde el form
 * @param {*} name UserName que viene desde el form
 * @param {*} id si es negativo, estoy creando un usuario nuevo y se chequea si el UserName y Email ya se encuentran registrados. Si es positivo, estoy editando un Usuario.
 * @returns
 */
function userRepit(email, name, id) {
  dataValidation.userName.msg = "";
  dataValidation.userEmail.msg = "";

  for (let i = 0; i < usersDB.length; i++) {
    if (id < 0) {
      if (usersDB[i].user_name == name) {
        dataValidation.userName.msg =
          "Este nombre de usuario ya se encuentra registrado";
      }
      if (usersDB[i].email == email) {
        dataValidation.userEmail.msg = "Este email ya se encuentra registrado";
      }
    } else {
      if (usersDB.id != id) {
        if (usersDB[i].user_name == name) {
          dataValidation.UserName.msg =
            "Este nombre de usuario ya se encuentra registrado";
        }
        if (usersDB[i].email == email) {
          dataValidation.userEmail.msg = "Este email ya se encuentra registrado";
        }
      } else {
      }
    }
  }

  return dataValidation;
}

module.exports = userController;
