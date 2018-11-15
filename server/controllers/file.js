//const crypto    = require('crypto');
const keys      = require('../config/keys');
const imgsize   = require('../config/imageSize');
const fs        = require('fs');
const path      = require('path');
const sharp     = require('sharp');

exports.upload = (req, res, next) => {
  if (req.file) {
    const originName= req.file.filename;
    const img_url   = `${keys.DOWNLOAD_URL}${keys.UPLOAD_DIR}/${originName}`;
    const file_key  = req.body.file_key;
    const filePath  = { imageUrl: img_url };

    const dir       = path.join(process.cwd(), path.join(keys.PUBLIC_DIR, keys.UPLOAD_DIR));
    const fullPath  = path.join(dir, req.file.filename);
    const ext       = path.extname(fullPath);
    const onlyfileNam = path.parse(originName).name

    if(file_key) {

      fs.readFile(fullPath, (err, data)=> {
        if(err) 
          res.status(500).send(err);
  
        for(const keyItem in imgsize[file_key]) {
          const sizeInfo = imgsize[file_key][keyItem];
          sharp(fullPath)
            //.rotate(200)
            .resize(sizeInfo.w, sizeInfo.h)
            .toBuffer()
            .then(data => {
                const fileName = onlyfileNam + sizeInfo.nickname + ext;
                const f = path.join(dir, fileName);
                fs.writeFileSync(f, data);
            })
            .catch(err => {
              console.log(err);
            });
        }

        res.status(200).json(filePath);
      });
    } else {
      res.status(200).json(filePath);
    }
  }
};