import {Image} from '../models/images';
export const like = (req, res) => {

	let obj = {	check : true};
	console.log(req.user.username);
  Image.findById(req.params.imageId, (err, docs)=> {

  	docs.likes.forEach((likeArray)=> {
  		console.log(likeArray);
  		console.log(req.user._id);
  		if (likeArray.userId == req.user._id.toString()) {
  			obj.check = false;
  			Image.findByIdAndUpdate(req.params.imageId, {$pull: {likes: {userId: req.user._id } } },(err, docs)=>{
  					console.log("image disliked");
  			} );
  			//break;	
  		}
  	});

    if (obj.check) {
    	obj.check = true;
    	Image.findByIdAndUpdate(req.params.imageId, {$push: {likes: {userId: req.user._id } } },(err, docs)=>{
  					console.log("image liked succefully");
  			} );
    }
    res.send(obj);
  }); 
    
}