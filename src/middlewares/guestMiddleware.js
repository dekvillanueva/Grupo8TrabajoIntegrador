function guestMiddleware(req, resp, next){
    if(req.sessions.userLogged){
        return resp.redirect("../views/userDetail.ejs", {userToShow: req.sessions.userLogged});
    }
    next();
}
module.exports = guestMiddleware;