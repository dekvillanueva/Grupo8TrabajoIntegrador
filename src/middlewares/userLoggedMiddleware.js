const DB = require("../database/models");
const { Op } = require('sequelize');

async function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let userEmailInCookie = req.cookies.userEmail;

    if(userEmailInCookie){
        const userFromCookie = await DB.User.findOne({
            where: { email: userEmailInCookie },
            });
        
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }
    }
    
    if(req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    } 

    next();
}
module.exports = userLoggedMiddleware;