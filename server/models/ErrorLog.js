const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({
  request_url : { type: String, default: '' },
  error_msg   : { type: String, default: '' },
  dir_name    : { type: String, default: '' },
  file_name   : { type: String, default: '' }
});

const className = 'ErrorLog';
schema.plugin(timestamp);
const ErrorLog = mongoose.model(className, schema);

module.exports = ErrorLog;
