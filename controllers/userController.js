const { validationResult } = require('express-validator')
const multerMidd = require("../middlewares/multerMiddleware");
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../database/users.json');
const uploadUserImagePath = "/assets/images/avatars/";
const users = findAll();

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

    let imageName = uploadUserImagePath + "image" + '-' + Date.now() + path.extname(file.originalname);
    let id = users[users.length - 1].id + 1;
    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;

        // let userInDB = users.findByField(email, req.body.email);
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

    let usersToSave = users;
    usersToSave.push(userToSave);

    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was saved.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/userDetail/' + id);
    // }
  },

  updateUser: (req, res) => {
    let id = req.params.id;
    const userToEdit = users.filter((user) => (user.id == id));

    res.render("userUpdate.ejs", { user: userToEdit[0] });
  },

  editUser: (req, res) => {
    let id = req.params.id;
    const file = req.file;
    let imageName = '';
    let modificarImagen = false;
    if (file) {
      imageName = uploadUserImagePath + "image" + '-' + Date.now() + path.extname(file.originalname);
      modificarImagen = true
      console.log(imageName);
    } else {

    }

    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;

    const userToUpdate = users.filter((user) => (user.id == id))[0];

    userToUpdate.userName = userName;
    userToUpdate.email = email;
    userToUpdate.password = passwordRepit;
    if (modificarImagen) {
      userToUpdate.avatar = imageName;
    }

    let usersToSave = users;
    const target = usersToSave.find(user => user.id == id);

    const userToReplace = Object.assign(target, userToUpdate);
    usersToSave.splice(findIndex(users, id), 1, userToReplace);

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
    const searchedUser = users.filter(user => user.id == id);
    res.render("userDetail.ejs", {
      userToShow: searchedUser[0]
    });
  },

  delete: (req, res) => {
    let id = req.params.id;
    const usersToSave = users.filter(user => user.id != id);
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was deleted.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/userDetail/' + id);
  },

  usersList: (req, res) => {
    const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    res.render("usersList.ejs", { users: usersList });
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

function findByField(field, text) {
  let allUsers = this.findAll();
  let userFound = allUsers.find(oneUser => oneUser[field] === text);
  return userFound;
}

// console.log(findByField(userEmail, 'liono@essensor.com'));

module.exports = userController;


