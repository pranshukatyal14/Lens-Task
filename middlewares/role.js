exports.authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.roles[0])) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};
