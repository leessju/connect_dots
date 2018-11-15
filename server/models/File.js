const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({
  file_id  : { type: String, required: true },
  file_seq : { type: Number, required: true },
  file_path: { type: String, required: true },
  file_name: { type: String, required: true },
  file_ext : { type: String, required: true },
  file_size: { type: Number, required: true },
  file_key : { type: String, required: true },
  mime_type: { type: String, required: true },
  temp_key : { type: String, default: '' },
  image_dir: { type: String, required: true },
  width    : { type: Number, required: true },
  height   : { type: Number, required: true }
});

const className = 'File';
schema.plugin(timestamp);
module.exports = mongoose.model(className, schema);