const User                       = require('../models/User');
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
    const result = await User.findById(req.params.id).select('user_id user_name nickname');;
    res.json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5003', error_content(err)));
    next();
  }
};

exports.current = (req, res) => {
  res.json(content(req.user, '1000'));
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
              nickname : user.nickname };  // Create JWT Payload

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

exports.add = async (req, res, next) => {
  const errors = valRegister(req.body);

  if (errors.error_yn === 'Y') {
    return res.status(400).json(content('', '3000', errors));
  }

  const newUser = new User({
    user_id  : req.body.user_id,
    pwd      : req.body.pwd,
    user_name: req.body.user_name,
    nickname : req.body.nickname,
    use_yn   : req.body.use_yn
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.pwd, salt, async (err, hash) => {
      newUser.pwd = hash;
      
      try {
        const result = await newUser.save();
        res.status(201).json(content(result, '1000'));
      } catch (err) {
        res.status(500).json(content('', '5002', error_content(err)));
        next();
      }
    });
  });
};

exports.put = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(201).json(content('', '1000'));
  } catch (err) {
    res.status(500).json(content('', '5004', error_content(err)));
    next();
  }
}

exports.delete = async (req, res, next) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.params.id });
    res.status(204).json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5001', error_content(err)));
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