const mongoose = require('mongoose');
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;
let objectType = Schema.Types.ObjectId;
let commentSchema = new Schema({
  userId  	: { type : objectType, ref : 'User' },
  datetime  : { type: Date, default: Date.now },
  message   : { type: String, required: true, min:1, max: 50},
  reply	    : [{
                    replyid : { type : objectType, ref : 'Reply' }
            }],
});

let Comment = db.model('Comment', commentSchema);

export {Comment};
