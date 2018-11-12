const validator   = require('validator');
const { isEmpty } = require('../../utils/common');

exports.valAdd = (data) => {
  let errors = { error_yn: 'N', error_msg: '' };

  data.table_name   = !isEmpty(data.table_name)? data.table_name:'';
  data.column_name  = !isEmpty(data.column_name) ? data.column_name : '';

  if (validator.isEmpty(data.table_name))
    errors.text += 'table_name field is required';

  if (!validator.isLength(data.table_name, { min: 2, max: 100 }))
    errors.text = 'table_name must be between 2 and 100 Characters.';

  if (validator.isEmpty(data.column_name))
    errors.text = 'column_name field is required';

  if (!validator.isLength(data.column_name, { min: 2, max: 100 }))
    errors.text = 'column_name must be between 2 and 100 Characters.';

  if (errors.error_msg.length > 0)
    errors.error_yn = 'Y';

  return errors;
};