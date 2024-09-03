const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import the cors package
const path = require('path');

const passport = require('passport');
const session = require('express-session'); // Import express-session
const MongoStore = require('connect-mongo'); // To store sessions in MongoDB
require('./config/passport'); // Import the passport configuration

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const confluenceRoutes = require('./routes/confluenceRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));
  
// Use express-session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your_secret_key', 
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  
// Initialize passport
app.use(passport.initialize());  
app.use(passport.session());

app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/confluence', confluenceRoutes);//confluence routes

app.get('/api/dashboard', protect, (req, res) => {
//app.get('/api/dashboard', protect, (req, res) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
    image: req.user.image,
  });
});

////
////
//
// Serve static files from the "client/dist" directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch-all handler to serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});
//
////
////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
