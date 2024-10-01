const express   = require('express');
const app       = express();
const cors      = require('cors');
const mongoose  = require('mongoose');
const helmet    = require('helmet');

require('dotenv').config();
const authroute = require('./routes/authroute');

// app.use(helmet());
// app.use(helmet({
//   contentSecurityPolicy: false, // Disable CSP if you're using inline styles or scripts
//   frameguard: { action: 'deny' }, // Prevent the site from being framed (Clickjacking protection)
//   referrerPolicy: { policy: 'no-referrer' }, // Set referrer policy
//   xssFilter: true, // Enable XSS filter
// }));

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(authroute)
app.listen((5000),()=>{
    console.log('port running')
})