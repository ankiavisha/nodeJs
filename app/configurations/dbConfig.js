const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/instagram');
db.once('open', function callback() {
                console.log('db connection open');
            });


export default db;