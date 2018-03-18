import {Image} from '../models/images';
import {User} from '../models/user';
const sizeOf = require('image-size');


export const upload = (req, res)=> {

  console.log(req.body.name);
 // console.log(req.body.image);
  console.log(req.user.id);

  let path = req.file ? req.file.path.replace('public', '') : '';
  
 // let dimensions = sizeOf('./public' + path);
  //if (dimensions.height <= 2000 && dimensions.width <= 3000 && req.file.size <= 5000000) {*/
  
  let newImage = new Image();
    
  newImage.name = req.body.name;
  newImage.description = req.body.description;
  //newImage.likes = [];
  //newImage.comments = [];
  newImage.userId = req.user.id;

  newImage.imagepath = path;

  newImage.save((err) => {
    if(err)
      return console.error(err);
    console.log('new image saved succefully :' + req.body.name);
  });

  User.findByIdAndUpdate(req.user.id,{$push :{images : {imageid : newImage.id}}}, (err)=> {
       console.log("successfully updated");
      }); 
  res.redirect('/home');
};

export const renderUpload = (req, res) => {
  res.render('pages/images',null);
};