const express = require('express');
const { registerUser, loginUser, googleAuth, getUserProfile,updateUserProfile } = require('../controllers/authController');
const { getUserList } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { getUserCount } = require('../controllers/homeController');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
//router.post('/google', googleAuth);


router.put('/update-profile', protect, updateUserProfile);//only 

router.get('/profile', protect, getUserProfile);
router.get('/user-count', protect, getUserCount);
router.get('/user-list', protect, getUserList);






const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/*router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`${process.env.APP_URL}dashboard`);
  }
);*/

router.get(
  '/google/callback',
  
  
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: `${process.env.APP_URL}dashboard/home`,
  })
  
  /*(req, res) => {
    passport.authenticate('google', (err, user) => {
      if (err || !user) {
        return res.redirect('http://localhost:3000/login');
      }
  
      // Generate the JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
  
      // Redirect to the dashboard with the token in the query string, or handle it differently
      res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    })(req, res);
  }*/
);

router.get("/login/success",async(req,res)=>{

  if (req.user) {
    // Generate a JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Send the token and user data in the response
    res.status(200).json({
      message: "User login successful",
      user: req.user,
      token: token,
    });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
})


router.get("/logout",(req,res,next)=>{
  req.logout(function(err){
      if(err){return next(err)}
      res.redirect(process.env.APP_URL);
  })
})


module.exports = router;
