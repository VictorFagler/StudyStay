const User = require('../Schema/userSchema')
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth')


exports.createNewUser = async (req, res) => {
  const { firstName, lastName, streetName, postalCode, city, mobile, company, email, password, profileImg } = req.body;

  if (!firstName || !lastName || !streetName || !postalCode || !city || !mobile || !email || !password) {
    return res.status(404).json({ message: 'You need to enter all the fileds' })
  }

  const salt = bcrypt.genSaltSync(10);

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: 'filed when encrpterin the password'
      })
    }
    User.create({ firstName, lastName, streetName, postalCode, city, mobile, email, passwordHash: hash })

      .then(user => {
        res.status(201).json({
          token: auth.generateToken(user)
        })
      })
  })

}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'You need to enter both email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect credentials' });
    }

    bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong when decrypting the password' });
      }

      if (!result) {
        return res.status(401).json({ message: 'Incorrect credentials' });
      }

      const token = auth.generateToken(user);
      res.status(200).json({ token, user });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Cannot find the prodocts'
      })
    })
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Could not find the user' });
    }

    const displayName = `${user.firstName} ${user.lastName}`;

    const userWithDisplayName = {
      ...user._doc,
      displayName,
    };

    res.status(200).json(userWithDisplayName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};