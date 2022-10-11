const User = require('../models/user');
let redirectUrl;

module.exports.goToRegister = (req, res) => {
  res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) { return next(err); }
      req.flash('success', "가입 완료!");
      res.redirect('/');
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
}

module.exports.goToLogin = (req, res) => {
  redirectUrl = req.session.returnTo || '/';
  res.render('users/login');
}

module.exports.login = (req, res) => {
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
}