const mongoose = require('mongoose');
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;
let objectType = Schema.Types.ObjectId;
let replySchema = new Schema({
  userId  : { type : objectType, ref : 'User' },
  datetime  : { type: Date, default: Date.now },
  message  : { type: String, required: true, min:1, max: 50},
});


let Reply = db.model('Reply', replySchema);

export {Reply};

