const { validationResult } = require('express-validator')

const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const uploadUserImagePath = "/assets/images/avatars/";


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
  

    let userToSave = {
      id: id,
      userName: userName,
      email: email,
      password: passwordRepit,
      avatar: imageName,
     }


    let usersToSave = users;
    usersToSave.push(userToSave);

    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(usersToSave, null, 2));
      console.log("User was saved.");
    } catch (error) {
      console.error(error);
    }
    // res.redirect('/userDetail/:' + id);
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
    }else{

    }
    
    let userName = req.body.userName;
    let email = req.body.userEmail;
    let password = req.body.userPassword;
    let passwordRepit = req.body.userRepitPassword;
    
    const userToUpdate = users.filter((user) => (user.id == id))[0];

    userToUpdate.userName = userName;
    userToUpdate.email = email;
    userToUpdate.password = passwordRepit;
    userToUpdate.avatar = imageName;

    if(modificarImagen){
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
    res.redirect('/usersList');
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
    res.redirect('/usersList');
  },

  usersList: (req, res) => {
    const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    res.render("usersList.ejs", {users: usersList});
  }

};


function findIndex(list, id) {
  for(let i=0; i<list.length; i++) {
    if (list[i].id == id) {
      return i;
    }
  }
}


module.exports = userController;


