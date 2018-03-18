const mongoose = require('mongoose');

import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;
let objectType = Schema.Types.ObjectId;
const checkEmail = "/^[a-zA-Z0-9.!#$&_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"; 
let userSchema = new Schema({
  email 			: { type: String,
  								required: true,
  								unique: true,
  								validate: { validator: function(v) {
                    						return true;
                							}
                						}
           			},
  username    : { type: String, required: true},
  password    : { type: String, required: true},
  images      : [{
                  imageid : { type : objectType, ref : 'Image' }
                }]
});

let User = db.model('User', userSchema);

export {User};

