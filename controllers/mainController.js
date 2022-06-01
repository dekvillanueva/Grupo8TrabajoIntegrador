
const mainController = {

    home:(req, res) =>{
        res.render('home')
    },

    login:(req, res) =>{
        res.render('login')
    },

    register:(req, res) =>{
        res.render('register')
    },

    cart:(req, res) =>{
        res.render('cart')
    }

}

module.exports = mainController;