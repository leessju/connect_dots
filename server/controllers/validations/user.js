const validator   = require('validator');
const { isEmpty } = require('../../utils/common');

exports.valRegister = (data, isUpdate = false) => {
  let errors = { error_yn: 'N', error_msg: '' };

  if (!isUpdate) 
  {
    data.email    = !isEmpty(data.email)    ? data.email    : '';
    data.phone    = !isEmpty(data.phone)    ? data.phone    : '';
    data.address1 = !isEmpty(data.address1) ? data.address1 : '';
    data.address2 = !isEmpty(data.address2) ? data.address2 : '';
    data.zipcode  = !isEmpty(data.zipcode)  ? data.zipcode  : ''; 

    if (validator.isEmpty(data.user_id))
      errors.error_msg += 'user_id field is required' + ';';

    if (!validator.isLength(data.user_id, { min: 4, max: 50 }))
      errors.error_msg += 'user_id must be between 4 and 50 Characters.' + ';';

    if (!validator.isEmail(data.user_id))
      errors.error_msg += 'user_id must be email format.' + ';';

    if (validator.isEmpty(data.pwd))
      errors.error_msg += 'pwd field is required' + ';';

    if (!validator.isLength(data.pwd, { min: 8, max: 30 }))
      errors.error_msg += 'pwd must be between 8 and 30 Characters.' + ';';

    if (validator.isEmpty(data.user_name))
      errors.error_msg += 'user_name field is required' + ';';

    if (!validator.isLength(data.user_name, { min: 2, max: 30 }))
      errors.error_msg += 'user_name must be between 2 and 30 Characters.' + ';';

    if (validator.isEmpty(data.nickname))
      errors.error_msg += 'nickname field is required' + ';';

    if (!validator.isLength(data.nickname, { min: 2, max: 30 }))
      errors.error_msg += 'nickname must be between 2 and 30 Characters.';

  } else {
    data.email     = !isEmpty(data.email)        ? data.email         : '';
    data.phone     = !isEmpty(data.phone)        ? data.phone         : '';
    data.address1  = !isEmpty(data.address1)     ? data.address1      : '';
    data.address2  = !isEmpty(data.address2)     ? data.address2      : '';
    data.zipcode   = !isEmpty(data.zipcode)      ? data.zipcode       : '';

    if (validator.isEmpty(data.email))
      errors.error_msg += 'email field is required' + ';';

    if (!validator.isLength(data.email, { min: 4, max: 50 }))
      errors.error_msg += 'email must be between 4 and 50 Characters.' + ';';

    if (!validator.isEmail(data.email))
      errors.error_msg += 'email must be email format.' + ';';
  }

  if (errors.error_msg.length > 0)
    errors.error_yn = 'Y';

  return errors;
}

exports.valLogin = data => {
  let errors = { error_yn: 'N', error_msg: '' };

  data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
  data.pwd = !isEmpty(data.pwd) ? data.pwd : '';

  if (validator.isEmpty(data.user_id))
    errors.error_msg += 'user_id field is required' + ';';

  if (!validator.isLength(data.user_id, { min: 4, max: 50 }))
    errors.error_msg += 'user_id must be between 4 and 50 Characters.' + ';';

  if (validator.isEmpty(data.pwd))
    errors.error_msg += 'pwd field is required' + ';';

  if (!validator.isLength(data.pwd, { min: 8, max: 30 }))
    errors.error_msg += 'pwd must be between 8 and 30 Characters.' + ';';

  if (errors.error_msg.length > 0)
    errors.error_yn = 'Y';

  return errors;
}