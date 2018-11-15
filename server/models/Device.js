const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({
  user              : { type: Schema.Types.ObjectId, ref: 'User' },
  app_name          : { type: String, required: true, default: '' }, 
  app_version       : { type: String, required: true, default: '' }, 
  device_id         : { type: String, required: true, default: '' }, 
  device_token      : { type: String, required: true, default: '' }, 
  device_name       : { type: String, required: true, default: '' }, 
  device_version    : { type: String, required: true, default: '' }, 
  device_model      : { type: String, required: true, default: '' }, 
  device_design     : { type: String, required: true, default: '' }, 
  device_brand      : { type: String, required: true, default: '' }, 
  device_manufactor : { type: String, required: true, default: '' }, 
  push_badge_yn     : { type: String, default: '' }, 
  push_alert_yn     : { type: String, default: '' }, 
  push_sound_yn     : { type: String, default: '' }, 
  device_status_type: { type: Number, default: 0 }, 
  device_browser    : { type: String, default: '' }, 
  device_type_idx   : { type: Number, default: '' }
});

const className = 'Device';
schema.plugin(timestamp);
const Code = mongoose.model(className, schema);

module.exports = Code;