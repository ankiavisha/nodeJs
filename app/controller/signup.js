import {User} from '../models/user';
import {passport} from 'passport';

export const signup = (req, res)=> {
  res.send(req.body);
  let newUser = new User({
    
    email       : req.body.email,
    username    : req.body.username,
    password    : req.body.password,
    images      : []
  });

  User.signup(newUser,req.body.password,(err,user)=> {
    if(err) {
      return res.render('pages/signup',{info:"Sorry that email already exists."});
    }
    passport.authenticate('local')(req, res, ()=> {
      res.redirect('/home');
    });
  })
};

export const renderSignup = (req, res) => {
  res.render('pages/signup', {username: ''});
};