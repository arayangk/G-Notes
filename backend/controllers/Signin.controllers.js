const jwt = require('jsonwebtoken');
const User  = require('../models/User');
const bcrypt = require('bcrypt');

exports.signIn = async (request, response) => {
    const { username, password } = request.body
  
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET_KEY,
        { expiresIn: 60*60 })
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }