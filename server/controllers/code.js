const Code        = require('../models/Code');
const { valAdd }  = require('./validations/code');
const { content, error_content } = require('../utils/common');

exports.get = async (req, res, next) => {
  const result = await Code.find();
  res.json(content(result, '1000'));
};

exports.search = async (req, res, next) => {
  const result = await Code.find({ table_name: /^ req.params.search_text / });
  res.json(content(result, '1000'));
};

exports.getById = async (req, res, next) => {
  try {
    const result = await Code.findById(req.params.id);
    res.json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5007', error_content(err)));
    next();
  }
};

//https://mongoosejs.com/docs/populate.html
exports.add = async (req, res, next) => {
  const errors = valAdd(req.body);
  if (errors.error_yn === 'Y')
    return res.status(400).json(content('', '3000', errors));

  const newCode = new Code({
    table_name        : req.body.table_name,
    column_name       : req.body.column_name,
    code_group_name   : req.body.code_group_name,
    code_group_name_en: req.body.code_group_name_en,
    use_yn            : req.body.use_yn
  });

  try {
    const result = await newCode.save();
    res.status(201).json(content(result, '1000'));
  } catch (err) {
    res.status(500).json(content('', '5002', error_content(err)));
    next();
  }
};

exports.put = async (req, res, next) => {
  try {
    await Code.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(201).json(content('', '1000'));
    next();
  } catch (err) {
    res.status(500).json(content('', '5006', error_content(err)));
    next();
  }
}

exports.delete = async (req, res, next) => {
  try {
    const result = await Code.findOneAndDelete({_id: req.params.id});
    res.status(204).json(content(result, '1000'));
    next();
  }catch(err) {
    res.status(500).json(content('', '5005', error_content(err)));
    next();
  }
  
}