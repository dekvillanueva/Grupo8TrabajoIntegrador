const { validationResult } = require('express-validator')
const multerMidd = require("../middlewares/multerMiddleware");
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../database/users.json');
const uploadUserImagePath = "/assets/images/avatars/";
const allUsers = findAll();

const userController = {

  userRegister: (req, res) => {
    res.render("userRegister.ejs");
  },

  processRegister: (req, res, next) => {

    const file = req.file
    if (!file) {
      const error = new Error('Please upload a Image File')
      error.httpStatusCode = 400
      return next(error)
    }

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("userRegister.ejs"),
      {
        errors: resultValidation.mapped(),
        oldData: req.body
      }
    }

    let imageName = uploadUserImagePath + req.file.filename;
    let id = generateID();
    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;

    // let userInDB = findByField(email, req.body.email);
    // if (userInDB) {
    //   return res.render("userRegister", {
    //     errors: {
    //       email: {
    //         msg: 'Este email ya se encuentra registrado'
    //       }
    //     },
    //     oldData: req.body
    //   })
    // }

    // if (password != passwordRepit) {
    //   // throw new Error("Las contraseñas ingresadas no son iguales");
    // } else {
    let userToSave = {
      id: id,
      userName: userName,
      email: email,
      password: bcryptjs.hashSync(passwordRepit, 10),
      avatar: imageName
    }

    console.log(imageName);
    console.log(userToSave.avatar);

    let usersToSave = allUsers;
    usersToSave.push(userToSave);

    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was saved.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/login');
    // }
  },

  updateUser: (req, res) => {
    let id = req.params.id;
    const userToEdit = allUsers.filter((user) => (user.id == id));

    res.render("userUpdate.ejs", { user: userToEdit[0] });
  },

  editUser: (req, res) => {
    let id = req.params.id;
    const file = req.file;
    let imageName = '';
    let modificarImagen = false;
    if (file) {
      imageName = uploadUserImagePath + req.file.filename;
      modificarImagen = true
      console.log(imageName);
    } else {

    }

    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;

    const userToUpdate = allUsers.filter((user) => (user.id == id))[0];

    userToUpdate.userName = userName;
    userToUpdate.email = email;
    userToUpdate.password = passwordRepit;
    if (modificarImagen) {
      userToUpdate.avatar = imageName;
    }

    let usersToSave = allUsers;
    const target = usersToSave.find(user => user.id == id);

    const userToReplace = Object.assign(target, userToUpdate);
    usersToSave.splice(findIndex(allUsers, id), 1, userToReplace);

    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was updated.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/userDetail/' + id);
  },

  userDetail: (req, res) => {
    let id = req.params.id;
    const searchedUser = allUsers.filter(user => user.id == id);
    res.render("userDetail.ejs", {
      userToShow: searchedUser[0]
    });
  },

  delete: (req, res) => {
    let id = req.params.id;
    const usersToSave = allUsers.filter(user => user.id != id);
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was deleted.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/usersList');
  },

  usersList: (req, res) => {
    const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    res.render("usersList.ejs", { users: usersList });
  },

  login: (req, res) => {
    res.render("login.ejs")
  },

  loginProcess: (req, res) => {
    let userToLogin = findByField('userEmail', req.body.email);
    console.log(userToLogin);
  }

};



//******************************** FUNCIONES AUXILIARES ******************************* */

function findAll() {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
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
  } else { id = 1; }
  return id;
}

//findByPk agregado 30/07 - porque no anda con this?
function findByPk(id) {
  let userFound = allUsers.find(oneUser => oneUser.id === id);
  return userFound;
}

//findByField agregado 30/07 - porque entre [field]?
function findByField(field, text) {
  let userFound = allUsers.find(oneUser => oneUser[field] === text);
  return userFound;
}


// console.log(findAll());
// console.log(findByPk(1));
// console.log(findByField("email", "optimus@essensor.com"));
// console.log(generateID());
// console.log(userController.create({name: 'Mariano', email: 'mariano@essensor.com'}));


// console.log(findByField(userEmail, 'liono@essensor.com'));

module.exports = userController;


