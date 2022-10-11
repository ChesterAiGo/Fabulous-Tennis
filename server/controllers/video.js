const Link = require('../models/link');

exports.read = (req, res) => {
  const { slug } = req.params;
  Link.findOne({slug: slug}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Error finding the link'
      });
    }
    return res.json(data);
  });
};
