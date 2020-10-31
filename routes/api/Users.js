const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { JWT_SECRET } = config;
mongoose.set('useCreateIndex', true);

//  User Model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields'})
  }

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ message: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;

                  res.json({
                    token: token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              );
            });
        });
      });
    })
    .catch(err => console.log(err))
});

// @route POST api/users
// @desc Register new user
// @access Public


module.exports = router;