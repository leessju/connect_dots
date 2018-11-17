//const crypto    = require('crypto');
//const { promisify } = require('util');
const fs      = require('fs');
const path    = require('path');
const sharp   = require('sharp');
const sizeOf  = require('image-size');
const File    = require('../models/File');
const keys    = require('../config/keys');
const imgsize = require('../config/imageSize');
const common  = require('../utils/common');

saveFile = async (fileInfo) => {
  const newFile = new File(fileInfo);
  try {
    const result = await newFile.save();
    //console.log(result);
  } catch (err) {
    //console.log(err);
  }
}

exports.upload = async (req, res, next) => {
  if (req.file) {
    const originName  = req.file.filename;
    const img_url     = `${keys.DOWNLOAD_URL}${keys.UPLOAD_DIR}/${common.today('YYYYMMDD')}/${originName}`;
    const file_path   = req.body.file_path;
    const dir         = path.join(process.cwd(), path.join(keys.PUBLIC_DIR, keys.UPLOAD_DIR, common.today('YYYYMMDD')));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const fullPath    = path.join(dir, req.file.filename);
    const ext         = path.extname(fullPath);
    const onlyfileNam = path.parse(originName).name
    const dim         = sizeOf(fullPath);

    saveFile({
      file_id  : onlyfileNam,
      file_seq : 0,
      file_path: file_path,
      file_key : 'origin',
      file_name: onlyfileNam,
      file_ext : ext,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      image_dir: common.today('YYYYMMDD'),
      temp_key : '',
      width    : dim.width,
      height   : dim.height
    });

    if(file_path) {

      fs.readFile(fullPath, (err, data) => {
        if(err) 
          res.status(500).send(err);

        //https://sharp.dimens.io/en/stable/api-resize/
        for(const file_key in imgsize[file_path]) {
          const sizeInfo = imgsize[file_path][file_key];
          sharp(fullPath)
            //.rotate(200)
            .resize(
              sizeInfo.w, 
              sizeInfo.h,{
                kernel: sharp.kernel.nearest,
                fit: sizeInfo.fit //cover(수치대로), contain(포함하여,여백은 투명), fill(모두이미지포함,이그러짐), inside(절대사이즈 맞춤, 작아짐) or outside(절대사이즈 맞춤, 커짐). (optional, default 'cover')
                //position: 'right bottom' //cover or contain. (optional, default 'centre')
                //background: { r: 255, g: 255, b: 0, alpha: 0.5 }
            })
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .withMetadata()
            .toBuffer() 
            .then((data) => {
                const fileName = onlyfileNam + sizeInfo.nickname + ext;
                const f        = path.join(dir, fileName);
                fs.writeFileSync(f, data);
                const d = sizeOf(f);
                saveFile({
                  file_id  : onlyfileNam,
                  file_seq : sizeInfo.seq,
                  file_path: file_path,
                  file_key : file_key,
                  file_name: onlyfileNam + sizeInfo.nickname,
                  file_ext : ext,
                  file_size: fs.statSync(f).size,
                  mime_type: req.file.mimetype,
                  image_dir: common.today('YYYYMMDD'),
                  temp_key : '',
                  width    : d.width,
                  height   : d.height
                });
            })
            .catch(err => {
              console.log(err);
            });
        }

        res.status(200).json({ imageUrl: img_url });
      });
    } else {
      res.status(200).json({ imageUrl: img_url });
    }
  }
};