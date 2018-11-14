const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema    = mongoose.Schema;

const schema = new mongoose.Schema({
  user_id           : { type: String, required: true, trim: true, unique: true },
  pwd               : { type: String, required: true, trim: true },
  user_name         : { type: String, required: true, trim: true },
  nickname          : { type: String, trim: true },
  userinfo          : { type: Schema.Types.ObjectId, ref: 'UserInfo' },
  use_yn            : { type: String, default: 'N' }
});

//http://plugins.mongoosejs.io/plugins/autopopulate 
//http://plugins.mongoosejs.io/plugins/lean-virtuals

const className = 'User';
schema.plugin(timestamp);
module.exports = mongoose.model(className, schema);