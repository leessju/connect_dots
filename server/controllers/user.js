const User                       = require('../models/User');
const UserInfo                   = require('../models/UserInfo');
const { valRegister, valLogin }  = require('./validations/user');
const { content, error_content } = require('../utils/common');

const bcrypt                     = require('bcryptjs');
const jwt                        = require('jsonwebtoken');
const { JWT_SECRET }             = require('../config/keys');

exports.get = async (req, res, next) => {
  //const result = await User.find().select('user_id user_name nickname -_id');
  const result = await User.find().select('user_id user_name nickname');
  res.json(content(result, '1000'));
};

//https://mongoosejs.com/docs/queries.html 
exports.getById = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id).select('user_id user_name nickname');
    res.json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5003', error_content(err)));
    next();
  }
};

exports.current = async (req, res) => {
  try {
    const result = await User.findById(req.user.id)
      .populate('userinfo', ['email', 'phone', 'address1', 'address2'])
      .select('user_id user_name nickname');

    res.json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5000', error_content(err)));
    next();
  } 
};

exports.login = async (req, res, next) => {
  const errors = valLogin(req.body);

  if (errors.error_yn === 'Y') {
    return res.status(400).json(content('', '3000', errors));
  }

  const user_id = req.body.user_id;
  const pwd     = req.body.pwd;

  // Find user by user_id
  User.findOne({ user_id })
    .then(user => {
      // Check for user
      if (!user) {
        errors.error_yn = 'Y'
        errors.error_msg = 'User not found';
        return res.status(404).json(content('', '2000', errors));
      }

      // Check
      bcrypt.compare(pwd, user.pwd)
        .then(isMatch => {
          if (isMatch) {
            //res.json({msg: 'Success'});
            // User Matched

            const payload = { 
              id       : user.id, 
              user_id  : user.user_id, 
              user_name: user.user_name, 
              nickname : user.nickname,
              userinfo : user.userinfo };  // Create JWT Payload

            // Sign Token
            jwt.sign(
              payload,
              JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                res.json(content({ success: true, token: `Bearer ${token}` }, '1000'));
              }
            );
          } else {
            errors.error_yn = 'Y'
            errors.error_msg = 'Password incorrect';
            res.status(400).json(content('', '2000', errors));
            next();
          }
        });
    });
};

exports.register = async (req, res, next) => {
  const errors = valRegister(req.body);

  if (errors.error_yn === 'Y') {
    return res.status(400).json(content('', '3000', errors));
  }

  const newUser = new User({
    user_id  : req.body.user_id,
    pwd      : req.body.pwd,
    user_name: req.body.user_name,
    nickname : req.body.nickname
  });

  const newUserInfo = new UserInfo({
      email   : req.body.user_id,
      phone   : req.body.phone,
      zipcode : req.body.zipcode,
      address1: req.body.address1,
      address2: req.body.address2
    });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.pwd, salt, async (err, hash) => {
      newUser.pwd = hash;
      
      try {
        const result = await newUser.save();
        newUserInfo.user = result._id;

        const result2 = await newUserInfo.save();
        newUser.userinfo = result2._id;
        await newUser.save();

        const userData = await User.findById(result._id)
          .populate('userinfo', ['email', 'phone', 'address1', 'address2'])
          .select('user_id user_name nickname');

        res.status(201).json(content(userData, '1000'));
      } catch (err) {
        res.status(500).json(content('', '5000', error_content(err)));
        next();
      }
    });
  });
};

exports.update = async (req, res, next) => {

  const errors = valRegister(req.body, true);

  if (errors.error_yn === 'Y') {
    return res.status(400).json(content('', '3000', errors));
  }

  const updateUser = {
    nickname: req.body.nickname
  }

  const updateUserInfo = {
    email   : req.body.email,
    phone   : req.body.phone,
    address1: req.body.address1,
    address2: req.body.address2,
    zipcode : req.body.zipcode
  }

  try {
    await User.findOneAndUpdate({ _id: req.user.id }, updateUser);
    await UserInfo.findOneAndUpdate({ _id: req.user.userinfo }, updateUserInfo);

    const userData = await User.findById(req.user.id)
          .populate('userinfo', ['email', 'phone', 'address1', 'address2'])
          .select('user_id user_name nickname');

    res.status(201).json(content(userData, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5000', error_content(err)));
    next();
  }
}

exports.delete = async (req, res, next) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.user.id });
    res.status(204).json(content('', '1000'));
  } catch (err) {
    res.status(500).json(content('', '5000', error_content(err)));
    next();
  }
}



// Person.find({
//   occupation: /host/,
//   'name.last': 'Ghost',
//   age: { $gt: 17, $lt: 66 },
//   likes: { $in: ['vaporizing', 'talking'] }
// })
//   .limit(10)
//   .sort({ occupation: -1 })
//   .select({ name: 1, occupation: 1 })
//   .exec(callback);

// // Using query builder
// Person.find({ occupation: /host/ })
//   .where('name.last')
//   .equals('Ghost')
//   .where('age')
//   .gt(17)
//   .lt(66)
//   .where('likes')
//   .in(['vaporizing', 'talking'])
//   .limit(10)
//   .sort('-occupation')
//   .select('name occupation')
//   .exec(callback);