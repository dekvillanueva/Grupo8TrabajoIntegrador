function authMiddleware(req, resp, next){
    if(!req.session.userLogged){
        return resp.redirect("../views/login.ejs");
    }else{
        next();
    }
}
module.exports = authMiddleware;