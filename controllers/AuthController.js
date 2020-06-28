var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/User');

var userController = {};


userController.home = function(req, res){
    res.render('index', {user: req.user});
};

userController.register = function(req, res){
    res.render('register');
};

userController.doRegister = function(req, res){
    User.register(new User({username: req.body.username, name: req.body.name}), req.body.password, function(err, user){
        if(err){
            return res.render('register', {user: user});
        };
        passport.authenticate('local')(req, res, function(){
            res.redirect('/');
        });
    });
};

userController.login = function(req, res){
    res.render('login');
};

userController.doLogin = function(req, res){
    passport.authenticate('local')(req, res, function(){
        res.redirect('/');
    });
};

userController.logout = function(req, res){
    req.logout();
    res.redirect('/');
};

module.exports = userController;