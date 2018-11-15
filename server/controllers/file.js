
const keys       = require('../config/keys');

exports.upload = (req, res, next) => {
  if (req.file) {
    const filePath = { imageUrl: `${keys.DOWNLOAD_URL}images/uploads/${req.file.filename}` };
    res.status("200").json(filePath);
  } else {
    res.status("409").json("No Files to Upload.")
  }
};