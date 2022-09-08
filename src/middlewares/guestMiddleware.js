function guestMiddleware(req, resp, next){
    if(req.session.userLogged){
        return resp.render("../views/home.ejs");
    }else{
        next();
    }
}
module.exports = guestMiddleware;