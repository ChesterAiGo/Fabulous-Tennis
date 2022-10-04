const {check} = require('express-validator');


exports.userRegisterValidator = [
  check('name')
  .not()
  .isEmpty()
  .withMessage('Name is Required'),
  check('email')
  .isEmail()
  .withMessage('Must be valid email address'),
  check('password')
  .isLength({min: 6})
  .withMessage('len(Password) >= 6'),
  check('categories')
  .isLength({min: 6})
  .withMessage('Pick at least 1 category')
];


exports.userLoginValidator = [
  check('email')
  .isEmail()
  .withMessage('Must be valid email address'),
  check('password')
  .isLength({min: 6})
  .withMessage('len(Password) >= 6')
];


exports.forgotPasswordValidator = [
  check('email')
  .isEmail()
  .withMessage('Must be valid email address')
];

exports.resetPasswordValidator = [
  check('newPassword')
  .isLength({min: 6})
  .withMessage('len(Password) >= 6'),
  check('resetPasswordLink')
  .not()
  .isEmpty()
  .withMessage('Token is required')
];

exports.userUpdateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
];
