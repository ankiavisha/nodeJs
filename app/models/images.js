const mongoose = require('mongoose');
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;
let objectType = Schema.Types.ObjectId;

let imageSchema = new Schema({
  name        : String,
  description : String,
  imagepath		  : String,
  likes		    : [{userId: {type : objectType, ref : 'User'}}],
  comments    : [{
                  commentid : { type : objectType, ref : 'Comment' }
                }],
  userId	   	: { type : objectType, ref : 'User' },
  datetime  : { type: Date, default: Date.now },
});

let Image = db.model('Image', imageSchema);

export {Image} ;