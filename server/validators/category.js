const {check} = require('express-validator');


exports.categoryCreateValidator = [
  check('name')
  .not()
  .isEmpty()
  .withMessage('Name is Required'),
  check('image')
  .not()
  .isEmpty()
  .withMessage('Image is required'),
  check('content')
  .isLength({min: 20})
  .withMessage('Content is required (>= 20 characters)')
];

exports.categoryUpdateValidator = [
  check('name')
  .not()
  .isEmpty()
  .withMessage('Name is Required'),
  check('content')
  .isLength({min: 20})
  .withMessage('Content is required (>= 20 characters)')
];
