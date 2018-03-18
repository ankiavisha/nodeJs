import {User} from '../models/user';

export default (req, res, next) => {
  if(req.url === '/login' || req.url === '/signup' || (req.url === '/' && req.method === 'GET')) {
    if(req.user) {
      res.redirect('/home');
    } else {
      next();
    }
      
  }
  else {
   
    if (req.user)
      User.findById(req.user.id, (err, user) => {
        if (err)
          console.log(err);
               next();
      });
    else
      res.status(401).send('Please Log In first.<br><a href="/login">Login</a>');
  }
};