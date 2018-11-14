const validator   = require('validator');
const { isEmpty } = require('../../utils/common');

exports.valRegister = (data, isUpdate = false) => {
  const errors = {};

  if (!isUpdate) 
  {
    data.user_id  = !isEmpty(data.user_id)  ? data.user_id  : '';
    data.pwd      = !isEmpty(data.pwd)      ? data.pwd      : '';
    data.pwd2     = !isEmpty(data.pwd2)     ? data.pwd2     : '';
    data.user_name= !isEmpty(data.user_name)? data.user_name: '';
    data.nickname = !isEmpty(data.nickname) ? data.nickname : '';
    data.email    = !isEmpty(data.email)    ? data.email    : '';
    data.phone    = !isEmpty(data.phone)    ? data.phone    : '';
    data.address1 = !isEmpty(data.address1) ? data.address1 : '';
    data.address2 = !isEmpty(data.address2) ? data.address2 : '';
    data.zipcode  = !isEmpty(data.zipcode)  ? data.zipcode  : ''; 

    if (validator.isEmpty(data.user_id))
      errors.user_id = 'user_id field is required';
    else if (!validator.isLength(data.user_id, { min: 4, max: 50 }))
      errors.user_id = 'user_id must be between 4 and 50 Characters.';
    else if (!validator.isEmail(data.user_id))
      errors.user_id = 'user_id must be email format.';

    if (validator.isEmpty(data.pwd))
      errors.pwd = 'pwd field is required';
    else if (!validator.isLength(data.pwd, { min: 8, max: 30 }))
      errors.pwd = 'pwd must be between 8 and 30 Characters.';
      
    if (validator.isEmpty(data.pwd2))
      errors.pwd2 = 'confirm pwd field is required';
    else if (!validator.isLength(data.pwd2, { min: 8, max: 30 }))
      errors.pwd2 = 'confirm pwd must be between 8 and 30 Characters.';
    else if (data.pwd !== data.pwd2)
      errors.pwd = 'pwd and confirm pwd are not matched.';

    if (validator.isEmpty(data.user_name))
      errors.user_name = 'user_name field is required';
    else if (!validator.isLength(data.user_name, { min: 2, max: 30 }))
      errors.user_name = 'user_name must be between 2 and 30 Characters.';

    // if (validator.isEmpty(data.nickname))
    //   errors.nickname = 'nickname field is required';
    // else if (!validator.isLength(data.nickname, { min: 2, max: 30 }))
    //   errors.nickname = 'nickname must be between 2 and 30 Characters.';

  } else {
    data.email     = !isEmpty(data.email)        ? data.email         : '';
    data.phone     = !isEmpty(data.phone)        ? data.phone         : '';
    data.address1  = !isEmpty(data.address1)     ? data.address1      : '';
    data.address2  = !isEmpty(data.address2)     ? data.address2      : '';
    data.zipcode   = !isEmpty(data.zipcode)      ? data.zipcode       : '';

    if (validator.isEmpty(data.email))
      errors.email += 'email field is required' + ';';

    if (!validator.isLength(data.email, { min: 4, max: 50 }))
      errors.email += 'email must be between 4 and 50 Characters.' + ';';

    if (!validator.isEmail(data.email))
      errors.email += 'email must be email format.' + ';';
  }

  return errors;
}

exports.valLogin = data => {
  const errors = {};

  data.user_id  = !isEmpty(data.user_id)  ? data.user_id  : '';
  data.pwd      = !isEmpty(data.pwd)      ? data.pwd      : '';

  if (validator.isEmpty(data.user_id))
    errors.user_id = 'user_id field is required';
  else if (!validator.isLength(data.user_id, { min: 4, max: 50 }))
    errors.user_id = 'user_id must be between 4 and 50 Characters.';

  if (validator.isEmpty(data.pwd))
    errors.pwd = 'pwd field is required';
  else if (!validator.isLength(data.pwd, { min: 8, max: 30 }))
    errors.pwd = 'pwd must be between 8 and 30 Characters.';

  return errors;
}