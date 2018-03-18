import {Image} from '../models/images';
import {Comment} from '../models/comments';
import {User} from '../models/user';
export const comment = (req, res) => {
  let obj =  [];
    let i = 0;
  Image.findById(req.params.imageId, (err, data1) => {
    let n = data1.comments.length;
    if(n) {
      data1.comments.forEach((commentArray) => {
        Comment.findById(commentArray.commentid, (err, data2)=> {
          User.findById(data2.userId, (err, data3) => {
            data2.user = data3;
            obj[i] = data2;
            if(i==(n-1)) {
              res.render('pages/comments',{
                comments : obj,
                image : data1
              });
            }
            i++;
          });
        }).lean();
      })
    } else {
      res.render('pages/comments',{
        comments : obj,
        imageId : req.params.imageId
      }); 
    }
  });
  
};

export const addComment = (req, res) => {
  let newComment = new Comment();
    
  newComment.userId = req.user.id;
  newComment.message = req.body.message;

  newComment.save((err) => {
    if(err)
      return console.error(err);
    console.log('new Comment saved succefully :');
  });

  Image.findByIdAndUpdate(req.params.imageId,{$push :{comments : {commentid : newComment.id}}}, (err)=> {
    console.log("Comment successfully updated");
  }); 
  let url = '/images/'+req.params.imageId; 
  res.redirect(url);
};
