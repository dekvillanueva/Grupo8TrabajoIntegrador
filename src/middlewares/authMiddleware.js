function authMiddleware(req, resp, next){
    if(!req.sessions.userLogged){
        return resp.redirect("../views/login.ejs");
    }
    next();
}
module.exports = authMiddleware;