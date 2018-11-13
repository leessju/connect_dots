const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
//const mongoose_autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  user    : { type: Schema.Types.ObjectId, ref: 'User' },
  email   : { type: String, trim: true },
  phone   : { type: String, trim: true },
  zipcode : { type: String, trim: true },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true }
});

const className = 'UserInfo';
//schema.plugin(mongoose_autopopulate);
schema.plugin(timestamp);
module.exports = mongoose.model(className, schema);