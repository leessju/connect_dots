const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const passport   = require('passport');
const path       = require('path');
const fs         = require('fs');
var compression  = require('compression');
const helmet     = require('helmet');
const morgan     = require('morgan');
const multer     = require('multer');
const crypto     = require('crypto');
const common     = require('./server/utils/common');
const keys       = require('./server/config/keys');

const app        = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, keys.LOG_DIR, `${common.today('YYYY_MM_DD')}.log`), { flags: 'a' })}));
app.use(express.static(path.join(__dirname, keys.PUBLIC_DIR)));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), path.join(keys.PUBLIC_DIR, keys.UPLOAD_DIR, common.today('YYYYMMDD')));
    // dir = path.join(keys.PUBLIC_DIR, keys.UPLOAD_DIR, common.today('YYYYMMDD'));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  }, filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      const ext = path.extname(file.originalname);
      const fileName = raw.toString('hex') + ext;
      cb(null, fileName);
    });
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, path.join(keys.PUBLIC_DIR, keys.UPLOAD_DIR))));

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6 
};

mongoose
  .connect(keys.MONGODB_URI, options)
  .then(() => {
    console.log('Mongodb connected!!!!!!!!');
    app.use(passport.initialize());
    require('./server/config/passport')(passport);
  })
  .catch(err => {
    //console.log(err);
  });

app.use('/api/code', require('./server/routes/code'));
app.use('/api/user', require('./server/routes/user'));
app.use('/api/file', require('./server/routes/file'));

if(keys.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    console.log('---=== production ---===');
  })
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to My nicejames\' World.<br>You will get the easier mood than where you are.</h1>');
});

app.listen(keys.PORT, () => {
  console.log(`server staring (${keys.PORT})...`);
});