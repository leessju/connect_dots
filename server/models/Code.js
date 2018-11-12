const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

const schema = new mongoose.Schema({
  table_name        : { type: String, required: true, trim: true },
  column_name       : { type: String, required: true, trim: true },
  code_group_name   : { type: String, default: '' },
  code_group_name_en: { type: String, default: '' },
  use_yn            : { type: String, default: 'N' }
});

const className = 'Code';
schema.plugin(timestamp);
const Code = mongoose.model(className, schema);

module.exports = Code;



// ,
// education: [
//   {
//     school: {
//       type: String,
//       required: true
//     },
//     degree: {
//       type: String,
//       required: true
//     },
//     fieldofstudy: {
//       type: String,
//       required: true
//     },
//     from: {
//       type: Date,
//       required: true
//     },
//     to: {
//       type: Date
//     },
//     current: {
//       type: Boolean,
//       default: false
//     },
//     description: {
//       type: String
//     }
//   }
// ]